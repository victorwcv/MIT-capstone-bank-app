import { User, type IUser } from "@/models";

export const authenticateUser = async (documentId: string, password: string) => {
  return User.findOne({ documentId, password });
};

export const generateToken = (userId: string) => {
  // Placeholder for token generation logic
  return `token-${userId}`;
};