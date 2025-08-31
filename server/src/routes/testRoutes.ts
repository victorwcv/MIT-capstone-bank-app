import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.success({}, "Test route is working fine");
});

router.get("/ping", (_req: Request, res: Response) => {
  const data = { serverStatus: "up", timestamp: new Date() };
  res.success(data, "Ping successful");
});

export { router };
