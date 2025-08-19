import { Request, Response, NextFunction } from "express";
import { authService, userService } from "@/services";



export const loginUserController = async (req: Request, res: Response, next: NextFunction) => {
  const { documentId, password } = req.body;
  try {
    // Validate required fields
    if (!documentId || !password) {
      res.error("Missing required fields", 400);
      return;
    }

    // Authenticate user
    const user = await authService.authenticateUser(documentId, password);
    if (!user) {
      res.error("Invalid email or password", 401);
      return;
    }

    // Generate token (assuming a token generation function exists)
    const token = authService.generateToken(user.id);
    
    res.success({ token }, "Login successful", 200);
    console.log("✅ User logged in successfully");
  } catch (error) {
    next(error);
  }
}

