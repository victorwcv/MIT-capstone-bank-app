import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import generateBankAccNum from "../utils/generateBankAccNum.js";

export const userData = async (req, res, next) => {
  if (req.user.role !== "user") {
    return next(errorHandler(403, "You are not authorized"));
  }
  const userID = req.user._id;
  try {
    const user = await User.findById(userID);
    if (!user) {
      return next(errorHandler(401, "User not found"));
    }
    res.status(200).json(user.banking);
    console.log("Response data successfully");
  } catch (error) {
    console.error(error);
    return next(errorHandler(500, "Internal Server Error"));
  }
};

export const deposit = async (req, res, next) => {
  if (req.user.role !== "user") {
    return next(errorHandler(403, "You are not authorized"));
  }

  const {
    amount,
    destinationAccount,
    transactionDate,
    transactionTime,
    description,
  } = req.body;

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
      transactionDate,
      transactionTime,
      description,
    };


    const account = user.banking.bankAccounts.find(
      (account) => account.bankAccountNumber === destinationAccount
    );

    if (!account) {
      return next(errorHandler(404, "Destination account not found"));
    }

    account.accountBalance += amount;

    user.banking.transactions.push(transaction);
    await user.save();
    console.log("Transaction added succesfully");
    res.status(200).json(user.banking);
  } catch (error) {
    console.error(error);
    return next(errorHandler(500, "Internal Server Error"));
  }
};

export const withdrawal = async (req, res, next) => {
  if (req.user.role !== "user") {
    return next(errorHandler(403, "You are not authorized"));
  }

  const {
    amount,
    originAccount,
    transactionDate,
    transactionTime,
    description,
  } = req.body;

  const userID = req.user._id;

  try {
    const user = await User.findById(userID);
    if (!user) {
      return next(errorHandler(401, "User not found"));
    }

    const transaction = {
      type: "withdrawal",
      amount,
      originAccount,
      transactionDate,
      transactionTime,
      description,
    };


    const account = user.banking.bankAccounts.find(
      (account) => account.bankAccountNumber === originAccount
    );

    if (!account) {
      return next(errorHandler(404, "Origin account not found"));
    }

    if (account.accountBalance === 0 || account.accountBalance - amount < 0) {
      return next(errorHandler(400, "Insufficient funds"));
    } else {
      account.accountBalance -= amount;
      console.log("Withdrawal Success");
    }

    user.banking.transactions.push(transaction);
    await user.save();
    console.log("Transaction added succesfully", transaction);
    res.status(200).json(user.banking);
  } catch (error) {
    console.error(error);
    return next(errorHandler(500, "Internal Server Error"));
  }
};

export const newAccount = async (req, res, next) => {
  if (req.user.role !== "user") {
    return next(errorHandler(403, "You are not authorized"));
  }
  const userID = req.user._id;
  try {
    const user = await User.findById(userID);
    if (!user) {
      return next(errorHandler(401, "User not found"));
    }
    const newAccount = generateBankAccNum();
    user.banking.bankAccounts.push({ bankAccountNumber: newAccount });
    await user.save();
    res.status(200).json({
      banking: user.banking,
      newAccount,
    });
    console.log("Create Bank Account Success");
  } catch (error) {
    console.error(error);
    return next(errorHandler(500, "Internal Server Error"));
  }
}

export const bankTransfer = async (req, res, next) => {
  if (req.user.role !== "user") {
    return next(errorHandler(403, "You are not authorized"));
  }
  const { _id: userID } = req.user;
  const { amount, originAccount, destinationAccount, typeAccount, transactionDate, transactionTime, description } = req.body;
  try {
    const user = await User.findById(userID);
    if (!user) {
      return next(errorHandler(401, "User not found"));
    }
    const transaction = {
      type: "transfer",
      amount,
      originAccount,
      destinationAccount,
      transactionDate,
      transactionTime,
      description,
    };

    if (originAccount === destinationAccount) {
      return next(errorHandler(400, "Origin and destination account cannot be the same"));
    }

    const oAccount = user.banking.bankAccounts.find(
      (account) => account.bankAccountNumber === originAccount
    );
    if (!oAccount) {
      return next(errorHandler(404, "Origin account not found"));
    }
    if (oAccount.accountBalance < amount) {
      return next(errorHandler(400, "Insufficient funds"));
    } else {
      oAccount.accountBalance -= amount;
    }

    if (typeAccount === "own") {
      const dAccount = user.banking.bankAccounts.find(
        (account) => account.bankAccountNumber === destinationAccount
      );
      if (!dAccount) {
        return next(errorHandler(404, "Destination account not found"));
      } else {
        dAccount.accountBalance += amount;
      }
    } else {

      const dUser = await User.findOne({
        "banking.bankAccounts": {
          $elemMatch: {
            bankAccountNumber: destinationAccount,
          },
        }
      })
      if (!dUser) {
        return next(errorHandler(404, "Destination account not found"));
      }
      const dAccount = dUser.banking.bankAccounts.find(
        (account) => account.bankAccountNumber === destinationAccount
      );
      if (!dAccount) {
        return next(errorHandler(404, "Destination account not found"));
      } else {
        dAccount.accountBalance += amount;
      }
      dUser.banking.transactions.push(transaction);
      await dUser.save();
    }

    user.banking.transactions.push(transaction);
    await user.save();
    res.status(200).json(user.banking);
    console.log("Bank Transfer Success");
  } catch (error) {
    console.error(error);
    return next(errorHandler(500, "Internal Server Error"));
  }
}

export const payBill = async (req, res, next) => {
  if (req.user.role !== "user") {
    return next(errorHandler(403, "You are not authorized"));
  }
  const { _id: userID } = req.user;
  const {
    provider,
    amount,
    originAccount,
    transactionDate,
    transactionTime,
    invoiceNumber,
    description,
  } = req.body;
  try {
    const user = await User.findById(userID);
    if (!user) {
      return next(errorHandler(401, "User not found"));
    }
    const transaction = {
      type: "bill payment",
      provider,
      amount,
      originAccount,
      invoiceNumber,
      transactionDate,
      transactionTime,
      description,
    };
    const oAccount = user.banking.bankAccounts.find(
      (account) => account.bankAccountNumber === originAccount
    );
    if (!oAccount) {
      return next(errorHandler(404, "Origin account not found"));
    }
    if (oAccount.accountBalance < amount) {
      return next(errorHandler(400, "Insufficient funds"));
    } else {
      oAccount.accountBalance -= amount;
    }
    user.banking.transactions.push(transaction);
    await user.save();
    res.status(200).json(user.banking);
    console.log("Pay Bill Success");

  } catch (error) {
    console.error(error);
    return next(errorHandler(500, "Internal Server Error"));
  }
}

export const closeAccount = async (req, res, next) => {
  if (req.user.role !== "user") {
    return next(errorHandler(403, "You are not authorized"));
  }
  const { _id: userID } = req.user;
  const { bankAccountNumber } = req.body;
  try {
    const user = await User.findById(userID);
    if (!user) {
      return next(errorHandler(401, "User not found"));
    }
    const accountToDelete = user.banking.bankAccounts.find(
      (account) => account.bankAccountNumber === bankAccountNumber
    ) 
    if (accountToDelete.accountBalance !== 0) {
      return next(errorHandler(400, "Cannot delete account with balance"));
    }
    user.banking.bankAccounts = user.banking.bankAccounts.filter(account => account.bankAccountNumber !== bankAccountNumber);
    await user.save();
    res.status(200).json(user.banking);
    console.log("Delete Bank Account Success");
  } catch (error) {
    console.error(error);
    return next(errorHandler(500, "Internal Server Error"));
  }
}