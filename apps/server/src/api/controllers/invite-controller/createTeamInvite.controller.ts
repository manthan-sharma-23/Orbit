import { Response } from "express";
import { ProtectedRequest } from "../../../utils/types";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_CREATED_SUCCESSFULLY,
  RESOURCE_NOT_FOUND,
} from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";
import { INVITE, INVITE_TYPE } from "typings";

export const createTeamInvite = async (
  req: ProtectedRequest,
  res: Response
) => {
  try {
    const userId = req.user;
    const { teamId, to } = req.body;

    if (!userId) return res.sendStatus(RESOURCE_NOT_FOUND.code);

    const teamInviteQuery: INVITE = await db.invite.create({
      data: {
        type: INVITE_TYPE.space,
        from: userId,
        userId: to,
        teamId,
      },
      include: {
        Space: true,
      },
    });

    return res.status(RESOURCE_CREATED_SUCCESSFULLY.code).json(teamInviteQuery);
  } catch (error) {
    console.log(error);
    return res.sendStatus(INTERNAL_SERVER_ERROR.code);
  }
};
