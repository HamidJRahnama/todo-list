import mongoose, { Types } from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    userId: { type: Types.ObjectId, ref: "Users", required: true },
    categoryId: { type: Types.ObjectId, ref: "Categorys", required: true },
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ["todo", "in-progress", "done", "paused"], default: "todo" },
    priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Tasks", taskSchema);
