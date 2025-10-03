
import jwt from "jsonwebtoken";
import { register , login } from "./auth.service.ts";
import type { Request, Response } from "express";

const SECRET = process.env.JWT_SECRET_KEY || "secret";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const  token = await register(name, email, password);
    res.status(201).json({ message: "User registered" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};


export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await login(email, password);

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
