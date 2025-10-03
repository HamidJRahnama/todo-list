import doteenv from "dotenv";
doteenv.config()


import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";

const SECRET: string = process.env.JWT_SECRET_KEY!;

export const encodeToken = (payload: object | string) => {
  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
};

export const decodeToken = (token: string) => {
  return jwt.verify(token, SECRET);
};


export const sanitizeTask = (task: any) => {
  return {
    id: task._id,
    title: task.title,
    status: task.status,
    priority: task.priority,
    category: {
      id: task.categoryId._id,
      name: task.categoryId.name
    }
  };
};
