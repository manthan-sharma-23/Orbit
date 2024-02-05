import { Router } from "express";
import getRoom from "../controllers/room-controller/getRoom.controller";
import { authUser } from "../middlewares/auth.middleware";

const router: Router = Router();

router.get("/:roomId", authUser, getRoom);

export default router;
