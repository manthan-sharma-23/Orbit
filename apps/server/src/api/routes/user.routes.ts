import { Router } from "express";
import RegisterUser from "../controllers/user-controller/user.register";

const router: Router = Router();

router.post("/register", RegisterUser);

export default router;
