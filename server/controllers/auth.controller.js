import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const createAccount = async (req, res, next) => {
  
  const { username, email, password, address, phone } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    address,
    phone,
  });
  try {
    await newUser.save();
    res.status(201).json({
      message: "user created successfully",
    });
  } catch (error) {
    if (error.code === 11000 && error.keyValue.email) {
      // duplicate key error
      return res.status(409).json({ message: "email already in use" });
      } 
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ errors });
    }
    next(error);
  }
};
