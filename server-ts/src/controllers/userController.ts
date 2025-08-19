import { Request, Response, NextFunction } from "express";
import { userService } from "@/services";

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

    // Create new user
    const userToCreate = {
      email,
      documentId,
      password,
      fullName,
    };
    await userService.createUser(userToCreate);  
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