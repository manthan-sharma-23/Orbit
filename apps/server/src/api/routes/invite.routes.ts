import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware";
import { ValidateUserSpace } from "../middlewares/validate.Space";
import { ValidateUserTeam } from "../middlewares/validate.Team";
import { createSpaceInvite } from "../controllers/invite-controller/createSpaceInvite.controller";
import { createTeamInvite } from "../controllers/invite-controller/createTeamInvite.controller";

const router: Router = Router();
router
  .post("/create_invite_space", authUser, ValidateUserSpace, createSpaceInvite)
  .post("/create_invite_team", authUser, ValidateUserTeam, createTeamInvite);

export default router;
