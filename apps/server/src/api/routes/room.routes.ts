import { Router } from "express";
import getRoom from "../controllers/room-controller/getRoom.controller";
import { authUser } from "../middlewares/auth.middleware";
import { getUserRooms } from "../controllers/room-controller/getUserRooms";

const router: Router = Router();

router.get("/", authUser, getUserRooms);
router.get("/:roomId", authUser, getRoom);

export default router;
