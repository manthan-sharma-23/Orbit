import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware";
import { createThread } from "../controllers/thread-controller/createThread.controller";

const router: Router = Router();

router.post("/create", authUser, createThread);
export default router;
