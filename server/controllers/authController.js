import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";


export const signup = async (req, res) => {
  console.log("signup route reached");

  try {
    console.log("Request Body:", req.body); // Debug request data

    const { userName, email, password } = req.body;
    if (!userName || !password || !email) {
      console.log("Missing fields");
      return res.status(400).json({ error: "All fields are required" });
    }

    console.log("Checking if user exists...");
    const userExist = await User.findOne({ userName });

    if (userExist) {
      console.log("User already exists");
      return res.status(400).json({ message: "User already exists..." });
    }

    console.log("Hashing password...");
    const hashedPassword = bcryptjs.hashSync(password, 10);

    console.log("Creating new user...");
    const newUser = new User({ userName, email, password: hashedPassword });

    await newUser.save();
    console.log("User created successfully");

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message })
  }
}