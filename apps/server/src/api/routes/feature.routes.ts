import { Router } from "express";
import addFriend from "../controllers/feature-controller/addFriend.controller";
import { authUser } from "../middlewares/auth.middleware";
import acceptFriend from "../controllers/feature-controller/acceptFriends.controller";
import rejectFriend from "../controllers/feature-controller/rejectFriends.controller";
import getFriends from "../controllers/feature-controller/getFriends.controller";

const router: Router = Router();

router.get("/friends", authUser, getFriends);
router.post("/addfriend", authUser, addFriend);
router.post("/accept/:requestId", authUser, acceptFriend);
router.post("/reject/:requestId", authUser, rejectFriend);

export default router;
