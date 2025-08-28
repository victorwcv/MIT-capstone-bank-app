import { Router, Request, Response } from "express";
import { AppError } from "@/middlewares";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.success({}, "Test route is working fine");
});

router.get("/ping", (_req: Request, res: Response) => {
  const data = { serverStatus: "up", timestamp: new Date() };
  res.success(data, "Ping successful");
});

router.get("/fail", (req: Request, res: Response) => {
  throw new AppError("This is a controlled error", 400);
});

export { router };
