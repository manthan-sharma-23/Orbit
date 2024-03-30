import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware";
import { ValidateUserTeam } from "../middlewares/validate.Team";
import { createTeamInvite } from "../controllers/invite-controller/createTeamInvite.controller";
import { getUserInvites } from "../controllers/invite-controller/getUserInvites";
import { rejectTeamInvite } from "../controllers/invite-controller/rejectTeamInvite";
import { acceptTeamInvite } from "../controllers/invite-controller/acceptTeamInvite";

const router: Router = Router();
router.post(
  "/create_invite_team",
  authUser,
  ValidateUserTeam,
  createTeamInvite
);

router.get("/", authUser, getUserInvites);
router.put("/accept/:inviteId", authUser, acceptTeamInvite);
router.put("/reject/:inviteId", authUser, rejectTeamInvite);

export default router;
