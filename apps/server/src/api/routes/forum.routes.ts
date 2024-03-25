import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware";
import getFriends from "../controllers/friend-controller/getFriends.controller";
import { createForum } from "../controllers/forum-controller/createForum.controller";
import { getForums } from "../controllers/forum-controller/getForums.controller";

const router: Router = Router();

router.post("/create", authUser, createForum).get("/all", getForums);

export default router;
