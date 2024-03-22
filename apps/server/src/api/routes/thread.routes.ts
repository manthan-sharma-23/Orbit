import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware";
import { createThread } from "../controllers/thread-controller/createThread.controller";
import { getThreadInfo } from "../controllers/thread-controller/getThreadInfo.controller";
import { addMessageToThread } from "../controllers/thread-controller/addMessageToThread";

const router: Router = Router();

router
  .post("/create", authUser, createThread)
  .get("/info/:threadId", authUser, getThreadInfo)
  .post("/addMessage", authUser, addMessageToThread);
export default router;
