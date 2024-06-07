import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
export const test = (req, res) => {
  res.json({
    message: "Hello World 2!",
  });
};

export const deposit = async (req, res, next) => {
  if (req.user.role !== "user") {
    return next(errorHandler(403, "You are not authorized"));
  }

  const { amount, destinationAccount, depositDate, depositHour, description } =
    req.body;

  const userID = req.user._id;

  try {
    const user = await User.findById(userID);
    if (!user) {
      return next(errorHandler(401, "User not found"));
    }

    const transaction = {
      type: "deposit",
      amount,
      destinationAccount,
      depositDate,
      depositHour,
      description,
    };

    user.banking.transactions.push(transaction);
    user.banking.balance += parseFloat(amount);
    await user.save();
    console.log("Transaction added succesfully", transaction);
    res.status(200).json(user.banking);
  } catch (error) {
    console.log(error);
  }
};
