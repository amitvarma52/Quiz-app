/** @format */

import mongoose from "mongoose";
import colors from "colors";
export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`server running on ${mongoose.connection.host}`.bgGreen.red);
  } catch (error) {
    console.log(error);
  }
};
