import { Router } from "express";
import RegisterUser from "../controllers/user-controller/user.register";
import { rateLimiter } from "../middlewares/rateLimiter";
import LoginUser from "../controllers/user-controller/user.login";
import { authUser } from "../middlewares/auth.middleware";
import getUser from "../controllers/user-controller/user.get";

const router: Router = Router();

router.get("/", rateLimiter, authUser, getUser);
router.post("/register", rateLimiter, RegisterUser);
router.post("/login", rateLimiter, LoginUser);

export default router;
