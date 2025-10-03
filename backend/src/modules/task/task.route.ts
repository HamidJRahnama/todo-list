import { Router } from "express";
import validationMiddleware from "../../middlewares/validateMiddleware.ts";
import authMiddleware from "../../middlewares/authMiddleware.ts";
import { CreateTaskDto } from "./dto/create-task.dto.ts";
import { UpdateTaskDto } from "./dto/update-task.dto.ts";
import {
  createTaskController,
  updateTaskController,
  deleteTaskController,
  getTasksController,
  getTaskByIdController,
} from "./task.controller.ts";

const router = Router();

router.use(authMiddleware);

router.get("/", getTasksController);
router.get("/:id", getTaskByIdController);
router.post("/", validationMiddleware(CreateTaskDto), createTaskController);
router.put("/:id", validationMiddleware(UpdateTaskDto), updateTaskController);
router.delete("/:id", deleteTaskController);

export default router;
