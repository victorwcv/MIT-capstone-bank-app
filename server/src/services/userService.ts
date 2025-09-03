import { User, type IUser } from "@/models";
import { ConflictError, BadRequestError } from "@/errors/AppError";
import { hashPassword } from "@/utils";

export const createUser = async ({
  fullName,
  email,
  documentId,
  password,
}: Partial<IUser>): Promise<string> => {

  if (!fullName || !email || !documentId || !password) {
    throw new BadRequestError("Missing required fields", "BAD_REQUEST");
  }
  
  const existingUser = await User.findOne({ documentId });
  
  if (existingUser) {
    throw new ConflictError("User already exists", "USER_ALREADY_EXISTS");
  }

  const data = { fullName, email, documentId, password: await hashPassword(password) };
  const user = new User(data);
  await user.save();
  return user.id;
};

export const getAllUsers = async () => {
  return User.find();
};

export const findUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
