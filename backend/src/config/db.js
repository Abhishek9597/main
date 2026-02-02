import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const connectDb = async (req, res) => {
  try {
    const connect = process.env.MONGO_URI;
    if (!connect) {
      return res
        .status(400)
        .json({ message: "MongoUri is missing in environment variables" });
    }
    await mongoose.connect(connect);
    console.log("MongoDb connected");
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
