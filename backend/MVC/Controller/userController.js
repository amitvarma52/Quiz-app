/** @format */
import jwt from "jsonwebtoken";
import { scoreModel } from "../Model/scoreModel.js";
import { questionsModel } from "../Model/questionModel.js";
import { comparePassword, hashPassword } from "../../Helpers/hash-password.js";
import { userModel } from "../Model/userModel.js";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.USER_SECRET;
// user login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send("user not found");
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user._id, role: "select topic and view score" },
      JWT_SECRET,
      { expiresIn: "4h" }
    );
    delete user.password;
    return res.status(200).send({
      status: "succes",
      message: "user loged in successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const exists = await userModel.findOne({ name });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "name already exists",
      });
    }
    const existsEmail = await userModel.findOne({ email });
    if (existsEmail) {
      return res.status(400).json({
        success: false,
        message: "email already exists",
      });
    }
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(200).json({
      success: true,
      message: "user registered successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error,
    });
  }
};

export const addScore = async (req, res) => {
  try {
    const newScore = new scoreModel({
      ...req.body,
    });
    await newScore.save();
    return res.status(200).send("score added successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};
export const allScore = async (req, res) => {
  try {
    const allScore = await scoreModel.find({});
    return res.status(200).json(allScore);
  } catch (error) {
    console.error(`Error getting : ${error}`);
    return res.status(500).send("Internal Server Error");
  }
};
export const getScore = async (req, res) => {
  try {
    const { name } = req.params;
    const Score = await scoreModel.find({ name:name});
    return res.status(200).json(Score);
  } catch (error) {
    console.error(`Error getting : ${error}`);
    return res.status(500).send("Internal Server Error");
  }
};
export const getQuestions = async (req, res) => {
  try {
    const topics = req.params.topics.split(",");

    const questionsByTopic = await Promise.all(
      topics.map(async (topic) => {
        return await questionsModel.aggregate([{ $match: { topic: topic } }]);
      })
    );

    const allQuestions = questionsByTopic.flat();

    const randomQuestions = allQuestions
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);

    res.status(200).json({
      success: true,
      message: "Questions fetched successfully",
      data: randomQuestions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
