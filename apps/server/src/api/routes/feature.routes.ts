import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware";
import getFriends from "../controllers/friend-controller/getFriends.controller";
import addFriend from "../controllers/friend-controller/addFriend.controller";
import acceptFriend from "../controllers/friend-controller/acceptFriends.controller";
import rejectFriend from "../controllers/friend-controller/rejectFriends.controller";

const router: Router = Router();

router.get("/friends", authUser, getFriends);
router.post("/addfriend", authUser, addFriend);
router.post("/accept/:requestId", authUser, acceptFriend);
router.post("/reject/:requestId", authUser, rejectFriend);

export default router;
