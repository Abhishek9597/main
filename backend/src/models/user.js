import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    image: {type: String}
  },
  { timestamps: true, strict: true },
);

const userModel = mongoose.model("user", userSchema);
export default userModel;
