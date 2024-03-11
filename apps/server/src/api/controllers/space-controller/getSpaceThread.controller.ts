import { Response } from "express";
import { ProtectedRequest } from "../../../utils/types";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_FOUND_SUCCESSFULLY,
  RESOURCE_NOT_FOUND,
} from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";
import { TEAM } from "typings";

export const getSpaceThreads = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;

    const { spaceId } = req.params;

    if (!userId || !spaceId) {
      return res.json(RESOURCE_NOT_FOUND.code).json(RESOURCE_NOT_FOUND.action);
    }

    const teams: TEAM[] = await db.team.findMany({
      where: {
        spaceId,
        members: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        threads: true,
      },
    });

    return res.status(RESOURCE_FOUND_SUCCESSFULLY.code).json(teams);
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};
