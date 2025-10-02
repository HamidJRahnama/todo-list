import { Router } from "express";
import { registerUser, loginUser } from "./auth.controller.ts";
import validationMiddleware from "../../middlewares/validateMiddleware.ts";
import { RegisterUserDto } from "./dto/register-user.dto.ts";
import { LoginUserDto } from "./dto/login-user.dto.ts";

const router = Router();

router.post("/register", validationMiddleware(RegisterUserDto), registerUser);
router.post("/login", validationMiddleware(LoginUserDto), loginUser);

export default router;
