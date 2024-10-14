/** @format */

import mongoose from "mongoose";
const scoreSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "name is required"],
    },
    topic: {
      type: String,
      require: [true, "topic is required"],
    },
    score: {
      type: Array,
      require: [true, "score is required"],
    },
    date: { type: Date, default: Date.now },
  },
  { timestamp: true }
);
export const scoreModel = mongoose.model("scores", scoreSchema);
