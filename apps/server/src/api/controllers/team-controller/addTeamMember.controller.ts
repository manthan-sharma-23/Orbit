import { Response } from "express";
import { ProtectedRequest } from "../../../utils/types";
import {
  INTERNAL_SERVER_ERROR,
  INVALID_CREDENTIALS,
  INVALID_INPUTS,
  NON_UNIQUE_RESOURCE,
  RESOURCE_NOT_MODIFIED,
  UNAUTHORIZED_ACCESS,
} from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";
import { TEAM_ROLE } from "typings";

export const addTeamMemberController = async (
  req: ProtectedRequest,
  res: Response
) => {
  try {
    const userId = req.user;
    const { newMemberId, teamId } = req.body;

    if (!userId || !teamId) {
      return res.sendStatus(INVALID_CREDENTIALS.code);
    }
    const userIsAdminQuery = await db.userTeam.findFirst({
      where: {
        AND: [{ teamId }, { userId }],
      },
      select: {
        role: true,
      },
    });

    if (userIsAdminQuery.role !== TEAM_ROLE.admin) {
      return res
        .status(UNAUTHORIZED_ACCESS.code)
        .json(UNAUTHORIZED_ACCESS.action);
    }

    const isMemberAlreadyPresentQuery = await db.userTeam.findFirst({
      where: {
        teamId,
        userId: newMemberId,
      },
    });

    if (isMemberAlreadyPresentQuery !== null) {
      return res
        .status(NON_UNIQUE_RESOURCE.code)
        .json(NON_UNIQUE_RESOURCE.action);
    }
    const createNewMemberQuery = await db.userTeam.create({
      data: {
        userId: newMemberId!,
        teamId: teamId!,
        role: "member",
      },
      include: {
        team: true,
        user: true,
      },
    });

    if (!createNewMemberQuery)
      return res
        .status(RESOURCE_NOT_MODIFIED.code)
        .json(RESOURCE_NOT_MODIFIED.action);

    return res.send(createNewMemberQuery);
  } catch (error) {
    return res.sendStatus(INTERNAL_SERVER_ERROR.code);
  }
};
