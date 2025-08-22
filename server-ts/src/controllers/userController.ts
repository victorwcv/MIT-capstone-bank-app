import { Request, Response, NextFunction } from "express";
import { accountService, userService } from "@/services";
import { createAccountNumber, hashPassword } from "@/utils";
import { Types } from "mongoose";

export const registerUserController = async (req: Request, res: Response, next: NextFunction) => {
  const { fullName, email, documentId, password } = req.body;
  try {
    // Validate required fields
    if (!fullName || !email || !documentId || !password) {
      res.error("Missing required fields", 400);
      return;
    }

    // Check if user already exists
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      res.error("User already exists", 400);
      return;
    }

    const hashedPassword = await hashPassword(password);

    // Create new user
    const userToCreate = {
      fullName,
      email,
      documentId,
      password: hashedPassword,
    };

    const newUser = await userService.createUser(userToCreate);

    if (!newUser) {
      res.error("Failed to create user", 500);
      return;
    }

    // Create initial account for the user
    const initialAccount = {
      ownerId: newUser._id as Types.ObjectId,
      accountName: "Cuenta Digital",
      alias: null,
      accountNumber: createAccountNumber(),
      currency: "PEN",
      balance: 0,
    };

    const newAccount = await accountService.createAccount(initialAccount);

    if (!newAccount) {
      res.error("Failed to create initial account", 500);
      return;
    }

    res.success({}, "User created successfully", 201);
    console.log("✅ User created successfully");
  } catch (error) {
    next(error);
  }
};

export const getAllUsersController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();
    res.success(users, "Users retrieved successfully");
  } catch (error) {}
};
