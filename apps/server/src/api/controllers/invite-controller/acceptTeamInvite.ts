import { Response } from "express";
import { ProtectedRequest } from "../../../utils/types";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_NOT_FOUND,
  USER_ALREADY_EXISTS,
} from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";
import { INVITE, TEAM_ROLE } from "typings";

export const acceptTeamInvite = async (
  req: ProtectedRequest,
  res: Response
) => {
  try {
    const userId = req.user;

    const { inviteId } = req.params;

    console.log(userId,inviteId)

    if (!userId || !inviteId) return res.sendStatus(RESOURCE_NOT_FOUND.code);

    const invite: INVITE = await db.invite.findFirstOrThrow({
      where: {
        id: inviteId,
      },
    });

    const userSpace = await db.userSpace.findFirst({
      where: {
        AND: [{ spaceId: invite.spaceId }, { userId: invite.to }],
      },
    });

    if (!userSpace) {
      await db.userSpace.create({
        data: {
          spaceId: invite.spaceId,
          userId: invite.to,
          role: TEAM_ROLE.member,
        },
      });
    }

    const userTeam = await db.userTeam.findFirst({
      where: {
        AND: [{ userId: invite.to }, { teamId: invite.teamId }],
      },
    });

    if (userTeam) {
      return res.sendStatus(USER_ALREADY_EXISTS.code);
    }

    await db.userTeam.create({
      data: {
        userId: invite.to,
        teamId: invite.teamId,
      },
    });

    await db.invite.update({
      where: {
        id: invite.id,
      },
      data: {
        status: true,
      },
    });

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(INTERNAL_SERVER_ERROR.code);
  }
};
