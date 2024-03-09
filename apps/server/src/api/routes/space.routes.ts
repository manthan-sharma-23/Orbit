import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware";
import { createSpace } from "../controllers/space-controller/createSpace.controller";
import { getSpaceInfo } from "../controllers/space-controller/getSpaceInfo.controller";
import { removeSpaceMember } from "../controllers/space-controller/removeChannelMember";
const router: Router = Router();

router
  .post("/create/channel", authUser, createSpace) // add rate limiter in prod
  .get("/channel/:channelId", authUser, getSpaceInfo)
  .delete("/channel/member/remove", authUser, removeSpaceMember);

export default router;
