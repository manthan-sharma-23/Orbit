import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware";
import { getTeamInfo } from "../controllers/team-controller/getTeamInfo.controller";
import { addTeamMemberController } from "../controllers/team-controller/addTeamMember.controller";
import { createTeam } from "../controllers/team-controller/createTeam.controller";
const router: Router = Router();

router
  .get("/get/team/:teamId", authUser, getTeamInfo)
  .post("/member/add", authUser, addTeamMemberController)
  .post("/create/team", authUser, createTeam);

export default router;
