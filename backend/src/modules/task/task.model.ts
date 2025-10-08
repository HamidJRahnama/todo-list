import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["pending", "done" , "pause"], default: "pending" },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  dueDate: { type: Date },

  // مشخص می‌کنه تسک مربوط به Inbox یا Board هست
  type: { type: String, enum: ["inbox", "board"], default: "inbox" },

  // روابط
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  boardId: { type: mongoose.Schema.Types.ObjectId, ref: "Board", default: null },
  listId: { type: mongoose.Schema.Types.ObjectId, ref: "List", default: null },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

taskSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});export default mongoose.model("Task", taskSchema);
