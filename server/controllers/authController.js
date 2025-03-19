import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";


export const signup = async (req, res, next) => {
  console.log("signup route reached");

  try {
    console.log("Request Body:", req.body); // Debug request data

    const { username, email, password } = req.body;
    if (!username || !password || !email) {
      console.log("Missing fields");
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    console.log("Checking if user exists...");
    const userExist = await User.findOne({ email });

    if (userExist) {
      console.log("User already exists");
      return res.status(400).json({ success: false, message: "User already exists..." });
    }

    console.log("Hashing password...");
    const hashedPassword = bcryptjs.hashSync(password, 10);

    console.log("Creating new user...");
    const newUser = new User({ userName: username, email, password: hashedPassword });

    await newUser.save();
    console.log("User created successfully");

    return res.status(201).json({ success: true, message: "User created successfully" });
  } catch (error) {
    next(error)
  }
}