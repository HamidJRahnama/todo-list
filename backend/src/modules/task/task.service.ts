// I should create types for task body
import mongoose, { Types } from "mongoose";
import Tasks from "./task.model.ts";

/**
 * گرفتن تمام تسک‌ها برای یک کاربر
 * اختیاری: فیلتر بر اساس type و boardId
 */
export const getTasks = async (
  userId: string,
  type?: "inbox" | "board",
  boardId?: string
) => {
  const query: any = { userId: new mongoose.Types.ObjectId(userId) };
  if (type) query.type = type;
  if (boardId) query.boardId = new mongoose.Types.ObjectId(boardId);
  const results =await Tasks.find(query).sort({ createdAt: -1 });
  return results;
};

/**
 * گرفتن یک تسک بر اساس id و userId
 */
export const getTaskById = async (id: string, userId: string) => {
  const task = await Tasks.findOne({ _id: id, userId });
  if (!task) throw new Error("Task not found or unauthorized");
  return task;
};

/**
 * ایجاد یک تسک جدید
 */

export const createTask = async (userId: string, data: any) => {
  // اینجا ما به صورت صریح رشته را به ObjectId تبدیل می‌کنیم
  const task = new Tasks({ 
    ...data, 
    userId: new mongoose.Types.ObjectId(userId) // <-- این تغییر کلیدی است
  });
  return task.save();
};
/**
 * بروزرسانی یک تسک
 */
export const updateTask = async (id: string, userId: string, data: any) => {
  const task = await Tasks.findOneAndUpdate(
    { _id: id, userId },
     data, 
     {new: true,});
  if (!task) throw new Error("Task not found or unauthorized");
  return task;
};

/**
 * حذف یک تسک
 */
export const deleteTask = async (id: string, userId: string) => {
  const task = await Tasks.findOneAndDelete({ _id: id, userId });
  if (!task) throw new Error("Task not found or unauthorized");
  return task;
};

/**
 * انتقال یک تسک بین Inbox و Board/List
 */
export const moveTask = async (
  id: string,
  userId: string,
  targetType: "inbox" | "board",
  boardId?: string,
  listId?: string
) => {
  const updateData: any = { type: targetType, boardId: boardId || null, listId: listId || null };
  const task = await Tasks.findOneAndUpdate({ _id: id, userId }, updateData, { new: true });
  if (!task) throw new Error("Task not found or unauthorized");
  return task;
};
