import { Response } from "express";
import {
  FORBIDDEN_RESOURCE,
  INTERNAL_SERVER_ERROR,
  RESOURCE_NOT_MODIFIED,
} from "../../../utils/static/codes.err";
import { ProtectedRequest } from "../../../utils/types";
import { db } from "../../../utils/db";

export const createChannel = async (req: ProtectedRequest, res: Response) => {
  try {
    const { user } = req;
    const { channel_name, channel_description } = req.body;

    const channel = await db.channel.create({
      data: {
        name: channel_name,
        description: channel_description,
      },
      select: {
        id: true,
      },
    });
    if (!channel.id) return res.sendStatus(RESOURCE_NOT_MODIFIED.code);

    const generalTeam=await db.team.create
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};
