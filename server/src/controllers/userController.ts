import { Request, Response, NextFunction } from "express";
import { accountService, userService } from "@/services";
import { createAccountNumber, hashPassword } from "@/utils";
import { Types } from "mongoose";

export const registerUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fullName, email, documentId, password } = req.body;
    
   
    await userService.findUserByEmail(email);
 

    const hashedPassword = await hashPassword(password);

    // Create new user
    const userToCreate = {
      fullName,
      email,
      documentId,
      password: hashedPassword,
    };

    const newUser = await userService.createUser(userToCreate);

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
