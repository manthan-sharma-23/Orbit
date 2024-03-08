import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware";
import { rateLimiter } from "../middlewares/rateLimiter";

const router: Router = Router();

router.post("/create/channel",authUser,);

export default router;
