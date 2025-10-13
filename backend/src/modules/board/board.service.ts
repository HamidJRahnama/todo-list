// I should create types for Boards body
import Board from "./board.model.ts";

import mongoose from "mongoose";
import boardModel from "./board.model.ts";
import type { CreateBoardDto, UpdateBoardDto } from "./dto/CreateBoardDto.ts";

// دریافت تمام بوردهای یک کاربر
export const getBoards = async (userId: string) => {
    const query: any = { userId: new mongoose.Types.ObjectId(userId) };
    const results = await Board.find(query).sort({ createdAt: -1 });
    return results;
};

// دریافت یک بورد خاص با چک کردن مالکیت
export const getBoardById = async (boardId: string, userId: string) => {

    const board = await Board.findOne({
        _id: new mongoose.Types.ObjectId(boardId),
        userId: new mongoose.Types.ObjectId(userId),
    });

    if (!board) throw new Error("Board not found or unauthorized");
    return board;
};

// ایجاد یک بورد جدید
export const createBoard = async (userId: string, data: any) => {
  const board = new boardModel({
    ...data,
    userId: new mongoose.Types.ObjectId(userId), // حیاتی: تبدیل رشته به ObjectId
  });
  return await board.save();
};



// آپدیت کردن یک بورد
export const updateBoard = async (boardId: string, userId: string, data: UpdateBoardDto) => {
//   const board = await getBoardById(boardId, userId);
    const board = await Board.findOneAndUpdate(
        {_id: new mongoose.Types.ObjectId(boardId),userId: new mongoose.Types.ObjectId(userId)},  // چک کردن مالکیت قبل از آپدیت
        data, 
        { new: true}
    )
  if (!board) throw new Error('Board not found or you do not have permission.');
  return board;
  
//   // آپدیت فیلدها
//   Object.assign(board, data);
//   return await board.save();
};

// حذف یک بورد
export const deleteBoard = async (boardId: string, userId: string)=> {
  const board = Board.findOneAndDelete({
    _id: new mongoose.Types.ObjectId(boardId),
    userId: new mongoose.Types.ObjectId(userId), // چک کردن مالکیت قبل از حذف
  });

  return board;
};