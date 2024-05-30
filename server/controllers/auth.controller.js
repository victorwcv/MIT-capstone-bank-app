import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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
      next(errorHandler(409, "Email already in use"));
    } else if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      console.log(errors[0]);
      next(errorHandler(400, errors[0]));
    } else {
      next(error);
    }
  }
};

export const onlineBanking = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPass = await bcryptjs.compare(password, validUser.password);
    if (!validPass) return next(errorHandler(401, "Invalid Password"));
    // Sign JWT and add to response header as token
    const accessToken = jwt.sign(
      { _id: validUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res
      .cookie("access_token", accessToken, { httpOnly: true, maxAge: 60 * 60 * 1000, })
      .status(200)
      .json({
        _id: validUser._id,
        username: validUser.username,
        phone: validUser.phone,
        email: validUser.email,
        address: validUser.address,
      });
  } catch (error) {
    next(error);
  }
};
