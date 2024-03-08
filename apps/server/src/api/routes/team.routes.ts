import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware";
import { rateLimiter } from "../middlewares/rateLimiter";
import { createChannel } from "../controllers/team-controller/createChannel.controller";

const router: Router = Router();

router.post("/create/channel", authUser, createChannel);  // add rate limiter in prod

export default router;
