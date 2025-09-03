import { Request, Response, NextFunction } from "express";
import { accountService, userService } from "@/services";
import { successResponse } from "@/utils";

export const registerUserController = async (req: Request, res: Response, next: NextFunction) => {
  const { fullName, email, documentId, password } = req.body;
  try {
    const newUser = await userService.createUser({ fullName, email, documentId, password });
    await accountService.createAccount(newUser);
    res
      .status(201)
      .json(
        successResponse({ id: newUser, documentId, fullName, email }, "User created successfully")
      );
    console.log("✅ User created successfully");
  } catch (error) {
    next(error);
  }
};

export const getAllUsersController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();
    res.json({ users });
  } catch (error) {}
};
