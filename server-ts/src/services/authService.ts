import { User, type IUser } from "@/models";
import { comparePassword } from "@/utils";

export const authenticateUser = async (documentId: string, password: string) => {
  const userFound = await User.findOne({ documentId });
  if (!userFound) {
    return null;
  }
  const isPasswordValid = await comparePassword(password, userFound.password);
  if (!isPasswordValid) {
    return null;
  }

  const userWithoutPassword: Partial<IUser>  = {
    id: userFound._id,
    documentId: userFound.documentId,
    fullName: userFound.fullName,
    email: userFound.email,
    createdAt: userFound.createdAt,
  };

  return userWithoutPassword
};
