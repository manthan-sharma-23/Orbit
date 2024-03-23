import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware";
import { createMail } from "../controllers/mail-controller/createMail.controller";
import { getUserMails } from "../controllers/mail-controller/getUserMails.controller";

const router: Router = Router();

router.post("/create", authUser, createMail).get("/", authUser, getUserMails);

export default router;
