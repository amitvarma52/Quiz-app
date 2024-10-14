/** @format */

import mongoose from "mongoose";
const questionSchema = mongoose.Schema(
  {
    topic: {
      type: String,
      require: [true, "topic is required"],
    },
    question: {
      type: String,
      require: [true, "question is required"],
    },
    options: {
      type: Array,
      require: [true, "options is required"],
    },
    answer: {
      type: String,
      require: [true, "answer is required"],
    },
  },
  { timestamp: true }
);
export const questionsModel = mongoose.model("questions", questionSchema);
