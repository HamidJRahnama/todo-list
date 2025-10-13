import type { Request, Response } from "express";
import * as boardService from "./board.service.ts";


// دریافت تمام بوردهای کاربر
export const getBoardsController = async (req: Request, res: Response) => {
  try {
    
    const userId = req["userId"];
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const boards = await boardService.getBoards(userId);
    res.json(boards);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// دریافت یک بورد خاص
export const getBoardByIdController = async (req: Request, res: Response) => {
  try {
    const userId = req["userId"];
    const boardId = req.params.id;
    if (!boardId) return res.status(400).json({ message: "Board  ID is required" });
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const board = await boardService.getBoardById(boardId, userId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }
    res.json(board);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// ایجاد بورد جدید
export const createBoardController = async (req: Request, res: Response) => {
  try {
    const userId = req["userId"];
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const newBoard = await boardService.createBoard(userId, req.body);
    res.status(201).json(newBoard);

  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};



// آپدیت بورد
export const updateBoardController = async (req: Request, res: Response) => {
  try {
    const userId = req["userId"];
    const boardId = req.params.id;
    if (!boardId) return res.status(400).json({ message: "Board  ID is required" });
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const updatedBoard = await boardService.updateBoard(boardId, userId, req.body);
    res.json(updatedBoard);

  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// حذف بورد
export const deleteBoardController = async (req: Request, res: Response) => {
  try {
    const userId = req["userId"];
    const boardId = req.params.id;
    if (!boardId) return res.status(400).json({ message: "Board  ID is required" });
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    await boardService.deleteBoard(boardId, userId);
    res.json({ message: "Board deleted successfully" });

  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};