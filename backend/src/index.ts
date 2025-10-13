import dotenv from "dotenv";
dotenv.config();
console.log(process.env.MONGO_URL)



import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.ts";

import authRoutes from "./modules/auth/auth.routes.ts"
import categoryRoutes from "./modules/category/category.route.ts"
import taskRoutes from "./modules/task/task.route.ts"
import boardRoutes from "./modules/board/board.route.ts"


const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/categorys", categoryRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/boards", boardRoutes);



app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (err) {
    console.error("Error connecting to DB:", err);
    process.exit(1);
  }
});
