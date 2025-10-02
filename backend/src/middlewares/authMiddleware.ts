import type { Request, Response, NextFunction } from "express";
import { decodeToken } from "../utils/index.ts";


// Check for authorization header in the request and respond with 401 if not p
const authMiddleware = (req: any, res: Response, next: NextFunction) => {

  let token = req.headers['authorization'];
  if (!token) return res.status(401).send({message : "Unauthorized - middleware"})

  token = token.split(" ")[1]
  console.log(token)

  try {
const data = decodeToken(token) as { id: string; email: string; iat: number; exp: number };
req["userId"] = data.id;
    next()
    
  } catch (error) {
    
    res.status(401).send({message:"Unauthorized ---" , error})
  }
  


};

export default authMiddleware;