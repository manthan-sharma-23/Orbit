import { Router } from "express";
import RegisterUser from "../controllers/user-controller/user.register";
import { rateLimiter } from "../middlewares/rateLimiter";

const router: Router = Router();

router.post("/register", rateLimiter, RegisterUser);

export default router;
