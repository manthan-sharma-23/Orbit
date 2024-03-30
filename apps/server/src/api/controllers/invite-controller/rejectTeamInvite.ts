import { Response } from "express";
import { ProtectedRequest } from "../../../utils/types";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_NOT_FOUND,
  USER_ALREADY_EXISTS,
} from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";
import { INVITE, TEAM_ROLE } from "typings";

export const rejectTeamInvite = async (
  req: ProtectedRequest,
  res: Response
) => {
  try {
    const userId = req.user;

    const { inviteId } = req.params;

    if (!userId || !inviteId) return res.sendStatus(RESOURCE_NOT_FOUND.code);

    const invite: INVITE = await db.invite.findFirstOrThrow({
      where: {
        id: inviteId,
      },
    });

    await db.invite.update({
      where: {
        id: invite.id,
      },
      data: {
        status: false,
        isRejected:true
      },
    });

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(INTERNAL_SERVER_ERROR.code);
  }
};
