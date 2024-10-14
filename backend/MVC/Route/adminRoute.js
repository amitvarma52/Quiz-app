/** @format */

import express from "express";
import { addQuestion, adminLoginController } from "../Controller/adminController.js";
import { adminAuth } from "../../Helpers/authMiddleware.js";
const adminRouter = express.Router();

// Admin login route
adminRouter.post("/login", adminLoginController);

// Route add a new question
adminRouter.post("/add-question",adminAuth, addQuestion);

export default adminRouter;
