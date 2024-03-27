import { Router } from "express";
import getRoom from "../controllers/room-controller/getRoom.controller";
import { authUser } from "../middlewares/auth.middleware";
import { getUserRooms } from "../controllers/room-controller/getUserRooms";

const router: Router = Router();

router.get("/:friendUserId", authUser, getRoom);
router.get("/", authUser, getUserRooms);

export default router;
