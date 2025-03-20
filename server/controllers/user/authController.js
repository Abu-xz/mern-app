import User from "../../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'
import { errorHandler } from "../../utils/error.js";


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

export const login = async (req, res, next) => {
  console.log('login route reached...');
  console.log('request body: ', req.body);

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log('all field required');
      return next(errorHandler(401, 'All field required!'));
    }
    const validUser = await User.findOne({ email });
    if (!validUser) {
      console.log('Invalid user credentials.')
      return next(errorHandler(401, 'Invalid Credentials.'))
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password)
    if (validPassword) {
      console.log('invalid password')
      return next(errorHandler(402, 'Wrong password'))
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
    console.log('Login Success')

    const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000) // Expiry in 1 hour
    res.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json({ success: true, username: validUser.userName, message: 'Login Successful.' })

  } catch (error) {
    next(error);
  }
}

export const logout = (req, res) => {
  res.clearCookie('access_token', {
    httpOnly: true
  });
  res.status(200).json({ success: true, message: 'logout successfully' });
}

