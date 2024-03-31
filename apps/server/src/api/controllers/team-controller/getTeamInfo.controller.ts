import { Response } from "express";
import { ProtectedRequest } from "../../../utils/types";
import {
  FORBIDDEN_RESOURCE,
  INTERNAL_SERVER_ERROR,
  INVALID_INPUTS,
  RESOURCE_FOUND_SUCCESSFULLY,
  RESOURCE_NOT_FOUND,
} from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";
import { TEAM } from "typings";

export const getTeamInfo = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;

    if (!userId) {
      return res.sendStatus(FORBIDDEN_RESOURCE.code);
    }


    const { teamId } = req.params;
    if (!teamId) {
      return res.sendStatus(INVALID_INPUTS.code);
    }

    console.log(teamId,userId)
    const team: TEAM = await db.team.findUniqueOrThrow({
      where: {
        id: teamId,
      },
      include: {
        members: true,
        threads: true,
        space: true,
      },
    });

    if (!team) return res.sendStatus(RESOURCE_NOT_FOUND.code);

    return res.status(RESOURCE_FOUND_SUCCESSFULLY.code).json(team);
  } catch (error) {
    return res.sendStatus(INTERNAL_SERVER_ERROR.code);
  }
};
