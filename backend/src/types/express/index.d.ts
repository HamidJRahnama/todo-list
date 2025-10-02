import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string; // اگر مطمئن هستی همیشه مقدار داره، می‌تونی string بزاری بدون ?
    }
  }
}
