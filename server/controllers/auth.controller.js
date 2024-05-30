import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

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
      next(errorHandler(409, "Email already in use"));
      // res.status(409).json({ message: "email already in use" });
    } else if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      // res.status(400).json({message: errors[0] });
      console.log(errors[0]);
      next(errorHandler(400, errors[0]));
    } else {
      next(error);
    }
  }
};
