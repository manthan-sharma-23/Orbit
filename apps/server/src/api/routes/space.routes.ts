import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware";
import { createSpace } from "../controllers/space-controller/createSpace.controller";
import { getSpaceInfo } from "../controllers/space-controller/getSpaceInfo.controller";
import { removeSpaceMember } from "../controllers/space-controller/removeChannelMember";
import { getUserSpaces } from "../controllers/space-controller/getUserSpace";
import { getSpaceThreads } from "../controllers/space-controller/getSpaceThread.controller";
import { getSpaceDetails } from "../controllers/space-controller/getSpaceDetails";
import { getTownHall } from "../controllers/space-controller/getTownHall";

const router: Router = Router();

router
  .post("/create", authUser, createSpace) // add rate limiter in prod
  .get("/info/:spaceId", authUser, getSpaceInfo)
  .get("/details/:spaceId", authUser, getSpaceDetails)
  .get("/threads/:spaceId", authUser, getSpaceThreads)
  .get("/user", authUser, getUserSpaces)
  .get("/townhall/:spaceId", authUser, getTownHall)
  .delete("/channel/member/remove", authUser, removeSpaceMember);

export default router;
