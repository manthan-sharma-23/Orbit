import { Response } from "express";
import { ProtectedRequest } from "../../../utils/types";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_CONFLICT,
} from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";

export const getTeamInvites = async (req: ProtectedRequest, res: Response) => {
  try {
    const { teamId } = req.params;

    if (!teamId) return res.sendStatus(RESOURCE_CONFLICT.code);

    const fetchInvites = await db.invite.findMany({
      where: {
        teamId,
      },
    });

    return res.status(200).json(fetchInvites);
  } catch (error) {
    console.log(error);
    return res.sendStatus(INTERNAL_SERVER_ERROR.code);
  }
};
