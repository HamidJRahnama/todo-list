import Tasks from "./task.model.ts";


export const getTasks = async (userId: string) => {
  return Tasks.find({ userId }).populate("categoryId");
};

export const getTaskById = async (id: string, userId: string) => {
  const task = await Tasks.findOne({ _id: id, userId }).populate("categoryId");
  if (!task) throw new Error("Task not found or unauthorized");
  return task;
};


export const createTask = async (userId: string, data: any) => {
  const task = new Tasks({ ...data, userId });
  return task.save();
};

export const updateTask = async (id: string, userId: string, data: any) => {
  const task = await Tasks.findOneAndUpdate({ _id: id, userId }, data, { new: true });
  if (!task) throw new Error("Task not found or unauthorized");
  return task;
};

export const deleteTask = async (id: string, userId: string) => {
  const task = await Tasks.findOneAndDelete({ _id: id, userId });
  if (!task) throw new Error("Task not found or unauthorized");
  return task;
};
