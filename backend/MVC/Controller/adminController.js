/** @format */

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { questionsModel } from "../Model/questionModel.js";
dotenv.config();
const JWT_SECRET = process.env.ADMIN_SECRET;
export const adminLoginController = async (req, res) => {
  try {
    const { adminName, adminPass } = req.body;
    if (
      adminName === process.env.ADMIN_NAME &&
      adminPass === process.env.ADMIN_PASS
    ) {
      const token = jwt.sign(
        { id: adminName, role: "manage questions" },
        JWT_SECRET,
        {
          expiresIn: "4h",
        }
      );
      return res.status(200).json(token);
    } else {
      return res.status(401).json("Invalid admin name or password");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// add question

export const addQuestion = async (req, res) => {
  try {
    // Check if the question already there
    const exists = await questionsModel.findOne({
      ...req.body,
    });
    if (exists) {
      return res.status(409).send("question already exists");
    }

    const Question = new questionsModel({
      ...req.body,
    });

    await Question.save();

    return res.status(200).send("question added successfully");
  } catch (error) {
    console.error(error); 
    return res.status(500).send("Internal server error");
  }
};
