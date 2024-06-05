import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

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
