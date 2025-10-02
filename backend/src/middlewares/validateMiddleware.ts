import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import type { Request, Response, NextFunction } from "express";
import ClientErrors from "../errors/clientError.ts";

function validationMiddleware(type: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const clientError=new ClientErrors()
    
    const dtoInstance = plainToInstance(type, req.body);


    
    const errors = await validate(dtoInstance, {
      whitelist: true, 
      forbidNonWhitelisted: true,
    });


    if (errors.length > 0) {
      const formattedErrors = errors.map(err => ({
        field: err.property,
        messages: Object.values(err.constraints || {})
      }));
      clientError.data=[]
      clientError.errors=formattedErrors

      return res.status(400).json(clientError);

      // res.status(400).json({
      //   success: false,
      //   message: "Validation failed",
      //   errors: formattedErrors
      // });
    }

    
    req.body = dtoInstance;
    next();
  };
}

export default validationMiddleware;
