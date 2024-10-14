/** @format */
import express from "express";
import { addScore, allScore, getQuestions, getScore, loginController, registerController } from "../Controller/userController.js";
import { userAuth } from "../../Helpers/authMiddleware.js";

const userRouter = express.Router();

// Route for user login
userRouter.post("/login", loginController);

// Route for user registration
userRouter.post("/register", registerController);

// Route to add user score
userRouter.post("/add-score",userAuth, addScore);
// Route to get user score
userRouter.get("/get-score/:name",userAuth, getScore);

// Route to get all scores
userRouter.get("/scores", allScore);

// Route to get questions based on topics
userRouter.get("/questions/:topics", userAuth, getQuestions);

export default userRouter;