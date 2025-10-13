import type { Request, Response } from "express";
import * as taskService from "./task.service.ts";
import { sanitizeTask } from "../../utils/index.ts";

export const getTasksController = async (req: Request, res: Response) => {
  try {
    const userId = req["userId"];
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const tasks = await taskService.getTasks(userId);
    res.json(tasks);

  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getTaskByIdController = async (req: Request, res: Response) => {
  try {
    const userId = req["userId"];
    const taskId = req.params.id;
    if (!taskId) return res.status(400).json({ message: "Task  ID is required" });
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const task = await taskService.getTaskById(taskId, userId);
    res.json(task);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const createTaskController = async (req: Request, res: Response) => {
  try {
    const userId = req["userId"];
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const newTask = await taskService.createTask(userId, req.body);
    res.status(201).json(newTask);

  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateTaskController = async (req: Request, res: Response) => {
  try {
    const userId = req["userId"];
    const taskId = req.params.id;
    if (!taskId) return res.status(400).json({ message: "Task  ID is required" });
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const updatedTask = await taskService.updateTask(taskId, userId, req.body);
    res.json(updatedTask);

  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteTaskController = async (req: Request, res: Response) => {
  try {
    const userId = req["userId"];
    const taskId = req.params.id;
    if (!taskId) return res.status(400).json({ message: "Task  ID is required" });
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    await taskService.deleteTask(taskId, userId);
    res.json({ message: "Task deleted" });
    
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

