import { Router } from "express";
import RegisterUser from "../controllers/user-controller/user.register";
import { rateLimiter } from "../middlewares/rateLimiter";
import LoginUser from "../controllers/user-controller/user.login";
import { authUser } from "../middlewares/auth.middleware";
import getUser from "../controllers/user-controller/user.get";
import { getUserById } from "../controllers/user-controller/user.getAny";
import getAllUsers from "../controllers/user-controller/user.getAll";
import { updateUserInfo } from "../controllers/user-controller/user.update";

const router: Router = Router();

router.post("/register", rateLimiter, RegisterUser);
router.post("/login", rateLimiter, LoginUser);
router.get("/", authUser, getUser);
router.get("/all", authUser, getAllUsers);
router.get("/getuser/:userId", authUser, getUserById);
router.put("/update", authUser, updateUserInfo);

export default router;
