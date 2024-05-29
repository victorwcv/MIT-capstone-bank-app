import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const createAccount = async (req, res) => {
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
    if (error.code === 11000) {
      // duplicate key error
      return res.status(409).json({ message: "user already exists" });
    } else {
      console.log("Error in Saving user to database");
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
