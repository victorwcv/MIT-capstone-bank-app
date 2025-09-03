import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

router.get("/ping", (_req: Request, res: Response) => {
  const data = { serverStatus: "up", timestamp: new Date() };
  res.json(data);
});

export { router };
