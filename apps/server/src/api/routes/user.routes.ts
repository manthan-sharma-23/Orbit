import { Router } from "express";
import RegisterUser from "../controllers/user-controller/user.register";
import { rateLimiter } from "../middlewares/rateLimiter";
import LoginUser from "../controllers/user-controller/user.login";

const router: Router = Router();

router.post("/register", rateLimiter, RegisterUser);
router.post("/login", rateLimiter, LoginUser);

export default router;
