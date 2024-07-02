import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const allData = async (req, res, next) => {
  // console.log(req.user);
  if (req.user.role !== "admin") {
    next(errorHandler(403, "Access denied."));
  }
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(errorHandler(500, "Error getting users from DB"));
  }
};

export const createNewAdmin = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(errorHandler(403, "You are not authorized"));
  }
  const { username, email, password, } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newAdmin = new User({
    username,
    email,
    password: hashedPassword,
    role: "admin",
  });
  try {
    console.log(newAdmin);
    await newAdmin.save();
    res.status(201).json({
      status: "success",
      message: "Admin created successfully",
    });
    console.log('Admin created successfully');
  } catch (error) {
    return next(error);
  }
};

export const searchUser = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(errorHandler(403, "You are not authorized"));
  }
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    console.log('user found');
    const { password, ...data } = user._doc;
    res.status(200).json(data);
  } catch (error) {
    next(errorHandler(500, "Error getting user from DB"));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(errorHandler(403, "You are not authorized"));
  }
  const { _id } = req.params;
  if (_id === '665e56fbb51a56cd858c1d45') {
    return next(errorHandler(403, "You cannot delete this user"));
  }
  if (_id === req.user._id) {
    return next(errorHandler(403, "You cannot delete yourself"));
  }
  try {
    const user = await User.findOneAndDelete({ _id });
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    next(errorHandler(500, "Error deleting user from DB"));
  }
}