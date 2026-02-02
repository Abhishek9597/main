import userModel from "../../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
export default {
  async signUp(req, res) {
    try {
      const data = req.body;
      const {email, password} = data
      if(req.file) {
        data.image = req.file.path
      }
      const userExist = await userModel.findOne({ email });
      if (userExist) {
        return res
          .status(400)
          .json({ message: "User already exists with this email" });
      }
      const hashPass = await bcrypt.hash(password, 10);
      data.password = hashPass
      const newUser = await userModel(data);
      await newUser.save();
      return res
        .status(200)
        .json({ message: "User registered successfully", newUser });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },

  async login(req, res) {
    try {
      let { email, password } = req.body;
      if (email) email = email.toLowerCase();
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(404).json({ message: "Password does not match" });
      }
      const token = jwt.sign(
        {
          userId: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          email: user.email,
        },
        JWT_SECRET,
        { expiresIn: "60d" },
      );
      return res
        .status(200)
        .json({ message: "Login successfull", data: user, token });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },

  async getUser(req, res) {
    try {
      const userId = req.user.userId;
      const availableUser = await userModel
        .findById(userId)
        .select("-password");
      if (!availableUser) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({
        data: availableUser,
      });
    } catch (error) {
      console.error("Get admin error:", error);
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updateFields = {...req.body};
      if(req.file){
        updateFields.image = req.file.path
      }
      const updateUser = await userModel.findByIdAndUpdate(
        id,
        { $set: updateFields },
        { new: true, runValidators: true },
      );
      if (!updateUser) {
        return res.status(400).json({ message: "User not found" });
      }
      return res
        .status(200)
        .json({ message: "User updated successfully", updateUser });
    } catch (error) {
      return res  
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const {id} = req.params;

      const deleteUser = await userModel.findByIdAndDelete(id)
      if(!deleteUser){
        return res.status(404).json({message: "User not found"})
      }
      return res.status(200).json({message: "User deleted successfully", deleteUser})

    } catch (error) {
      return res.status(500).json({message: "Internal server error", error: error.message})
    }
  }
};
