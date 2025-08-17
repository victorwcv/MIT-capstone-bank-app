import { Router, Request, Response } from "express";
import { successResponse } from "@/utils";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  return successResponse(res, "Test route is working");
});

router.get("/ping", (_req: Request, res: Response) => {
  return successResponse(res, "Ping received successfully", {
    status: "alive",
    timestamp: new Date().toISOString(),
  });
});

export { router };
