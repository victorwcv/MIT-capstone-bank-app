import { User, type IUser} from '@/models';

export const createUser = async (data: Partial<IUser>) => {
  const user = new User(data);
  return user.save();
};

export const getAllUsers = async () => {
  return User.find();
};

export const findUserByEmail = async (email: string) => {
  return User.findOne({ email });
};