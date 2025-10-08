import type { Request, Response } from "express";
import * as taskService from "./task.service.ts";
import { sanitizeTask } from "../../utils/index.ts";

export const getTasksController = async (req: Request, res: Response) => {
  try {
    const userId = req["userId"];
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const tasks = await taskService.getTasks(userId);
    res.json(tasks.map(sanitizeTask));

  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getTaskByIdController = async (req: Request, res: Response) => {
  try {
    const userId = req["userId"];
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "Task  ID is required" });
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const task = await taskService.getTaskById(id, userId);
    res.json(sanitizeTask(task));
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const createTaskController = async (req: Request, res: Response) => {
  try {
    const userId = req["userId"];
    console.log("=================>>>>>",userId);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const task = await taskService.createTask(userId, req.body);
    res.status(201).json(task);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateTaskController = async (req: Request, res: Response) => {
  try {
    const userId = req["userId"];
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "Task  ID is required" });
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const task = await taskService.updateTask(id, userId, req.body);
    res.json(sanitizeTask(task));
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteTaskController = async (req: Request, res: Response) => {
  try {
    const userId = req["userId"];
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "Task  ID is required" });
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    await taskService.deleteTask(id, userId);
    res.json({ message: "Task deleted" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

