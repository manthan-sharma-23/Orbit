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
import { TEAM_ROLE, TEAM_TYPE } from "typings";

export const addTeamMemberController = async (
  req: ProtectedRequest,
  res: Response
) => {
  try {
    const userId = req.user;
    const { newMemberId, teamId, channelId } = req.body;

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

    if (
      userIsAdminQuery === null ||
      userIsAdminQuery.role !== TEAM_ROLE.admin
    ) {
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

    console.log(isMemberAlreadyPresentQuery);

    if (isMemberAlreadyPresentQuery !== null) {
      return res
        .status(NON_UNIQUE_RESOURCE.code)
        .json(NON_UNIQUE_RESOURCE.action);
    }

    const addNewMemberQuery = await db.$transaction([
      db.userTeam.create({
        data: {
          userId: newMemberId!,
          teamId: teamId!,
          role: TEAM_ROLE.member,
        },
        include: {
          team: true,
          user: true,
        },
      }),
      db.userChannel.create({
        data: {
          userId: newMemberId!,
          channelId,
          role: TEAM_ROLE.member,
        },
      }),
    ]);

    if (!addNewMemberQuery)
      return res
        .status(RESOURCE_NOT_MODIFIED.code)
        .json(RESOURCE_NOT_MODIFIED.action);

    return res.send(addNewMemberQuery);
  } catch (error) {
    return res.sendStatus(INTERNAL_SERVER_ERROR.code);
  }
};
