import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware";
import getFriends from "../controllers/friend-controller/getFriends.controller";
import addFriend from "../controllers/friend-controller/addFriend.controller";
import acceptFriend from "../controllers/friend-controller/acceptFriends.controller";
import rejectFriend from "../controllers/friend-controller/rejectFriends.controller";
import getPendingRequests from "../controllers/friend-controller/getRequest.controller";

const router: Router = Router();

router.get("/friends", authUser, getFriends);
router.get("/pending", authUser, getPendingRequests);
router.post("/addfriend", authUser, addFriend);
router.put("/accept/:requestId", authUser, acceptFriend);
router.put("/reject/:requestId", authUser, rejectFriend);

export default router;
