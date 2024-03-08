import { Response } from "express";
import { ProtectedRequest } from "../../../utils/types";
import {
  FORBIDDEN_RESOURCE,
  INTERNAL_SERVER_ERROR,
  INVALID_CREDENTIALS,
  RESOURCE_FOUND_SUCCESSFULLY,
  RESOURCE_NOT_FOUND,
} from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";

export const getChannelInfo = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;
    if (!userId) return res.sendStatus(FORBIDDEN_RESOURCE.code);

    const { channelId } = req.params;

    if (!channelId) return res.sendStatus(INVALID_CREDENTIALS.code);

    //fetch channel info
    const channel = await db.channel.findUnique({
      where: {
        id: channelId!,
      },
      include: {
        teams: {
          include: {
            members: {
              where: {
                role: "admin",
              },
            },
          },
        },
      },
    });

    if (!channel) {
      return res.sendStatus(RESOURCE_NOT_FOUND.code);
    }

    return res.status(RESOURCE_FOUND_SUCCESSFULLY.code).json(channel);
  } catch (error) {
    return res.sendStatus(INTERNAL_SERVER_ERROR.code);
  }
};