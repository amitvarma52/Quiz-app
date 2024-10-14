/** @format */

import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import colors from "colors";
import { connect } from "./DB.js";
import userRouter from "./MVC/Route/userRoute.js";
import adminRouter from "./MVC/Route/adminRoute.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Database 
connect();
// Routess
app.use("/api/v1/quiz/user", userRouter);
app.use("/api/v1/quiz/admin", adminRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.green.bold.italic.bgBlack);
});
