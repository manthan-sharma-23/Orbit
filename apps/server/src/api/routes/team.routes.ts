import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware";
import { rateLimiter } from "../middlewares/rateLimiter";
import { createChannel } from "../controllers/channel-controller/createChannel.controller";
import { getChannelInfo } from "../controllers/channel-controller/getChannelInfo.controller";
import { getTeamInfo } from "../controllers/team-controller/getTeamInfo.controller";
import { addTeamMemberController } from "../controllers/team-controller/addTeamMember.controller";

const router: Router = Router();

router
  .post("/create/channel", authUser, createChannel) // add rate limiter in prod
  .get("/channel/:channelId", authUser, getChannelInfo)
  .get("/get/team/:teamId", authUser, getTeamInfo)
  .post("/member/add",authUser,addTeamMemberController);

export default router;
