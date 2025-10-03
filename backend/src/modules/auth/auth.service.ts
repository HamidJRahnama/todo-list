import bcrypt from "bcrypt";
import userModel from "../user/user.model.ts";
import { encodeToken } from "../../utils/index.ts";

export const register = async (name: string, email: string, password: string) => {
  const existingUser = await userModel.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new userModel({ name, email, password: hashedPassword });
  await user.save();

  const token = encodeToken({ id: user._id, email: user.email });
  return  token ;
};


export const login = async (email: string, password: string) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return user;
};
