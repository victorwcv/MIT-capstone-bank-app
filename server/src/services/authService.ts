import { User, type IUser } from "@/models";
import { comparePassword } from "@/utils";

export const authenticateUser = async (documentId: string, password: string) => {
  if (!documentId || !password) {
    throw new Error("Missing required fields");
  }

  const userFound = await User.findOne({ documentId });
  if (!userFound) {
    throw new Error("User not found");
  }
  const isPasswordValid = await comparePassword(password, userFound.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const userWithoutPassword: Partial<IUser> = {
    id: userFound._id,
    documentId: userFound.documentId,
    fullName: userFound.fullName,
    email: userFound.email,
  };

  return userWithoutPassword;
};
