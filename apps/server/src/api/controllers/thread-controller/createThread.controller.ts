import { Response } from "express";
import { ProtectedRequest } from "../../../utils/types";
import {
  FORBIDDEN_RESOURCE,
  INTERNAL_SERVER_ERROR,
  INVALID_INPUTS,
  RESOURCE_FOUND_SUCCESSFULLY,
} from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";
import { TEAM_ROLE } from "typings";

export const createThread = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;

    const { name, teamId, type } = req.body;

    console.log(name, teamId, type);

    if (!teamId || !userId) {
      return res.sendStatus(INVALID_INPUTS.code);
    }

    const checkUserAdmin: { role: string } = await db.userTeam.findFirstOrThrow(
      {
        where: {
          userId,
          teamId,
        },
        select: {
          role: true,
        },
      }
    );

    if (checkUserAdmin && checkUserAdmin.role === TEAM_ROLE.admin) {
      const thread = await db.thread.create({
        data: {
          name,
          teamId,
          type: type || "chat",
        },
      });

      return res.status(RESOURCE_FOUND_SUCCESSFULLY.code).json(thread);
    } else {
      return res
        .status(FORBIDDEN_RESOURCE.code)
        .json(FORBIDDEN_RESOURCE.action);
    }
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};
