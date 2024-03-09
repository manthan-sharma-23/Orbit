import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware";
import { createSpace } from "../controllers/space-controller/createSpace.controller";
import { getSpaceInfo } from "../controllers/space-controller/getSpaceInfo.controller";
import { removeSpaceMember } from "../controllers/space-controller/removeChannelMember";
import { getUserSpaces } from "../controllers/space-controller/getUserSpace";
import { getSpaceThreads } from "../controllers/space-controller/getSpaceThread";

const router: Router = Router();

router
  .post("/create/channel", authUser, createSpace) // add rate limiter in prod
  .get("/info/:spaceId", authUser, getSpaceInfo)
  .get("/threads/:spaceId", authUser, getSpaceThreads)
  .get("/user", authUser, getUserSpaces)
  .delete("/channel/member/remove", authUser, removeSpaceMember);

export default router;
