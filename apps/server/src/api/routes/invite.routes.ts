import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware";
import { ValidateUserTeam } from "../middlewares/validate.Team";
import { createTeamInvite } from "../controllers/invite-controller/createTeamInvite.controller";
import { getUserInvites } from "../controllers/invite-controller/getUserInvites";
import { rejectTeamInvite } from "../controllers/invite-controller/rejectTeamInvite";
import { acceptTeamInvite } from "../controllers/invite-controller/acceptTeamInvite";
import { getTeamInvites } from "../controllers/invite-controller/getTeamInvites";

const router: Router = Router();
router.post(
  "/create_invite_team",
  authUser,
  ValidateUserTeam,
  createTeamInvite
);

router.get("/", authUser, getUserInvites);
router.get("/:teamId", authUser, getTeamInvites);
router.put("/accept/:inviteId", authUser, acceptTeamInvite);
router.put("/reject/:inviteId", authUser, rejectTeamInvite);

export default router;
