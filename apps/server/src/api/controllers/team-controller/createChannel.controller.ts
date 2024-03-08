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
    const userId = req.user;
    const { channel_name, channel_description } = req.body;

    if (!userId) res.sendStatus(FORBIDDEN_RESOURCE.code);

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

    const generalTeam = await db.team.create({
      data: {
        name: "general",
        description: "General Team",
        channel: {
          connect: {
            id: channel.id,
          },
        },
        members: {
          create: {
            userId: userId!,
            role: "admin",
          },
        },
        room: {
          create: {
            type: "team",
            users: {
              connect: {
                id: userId,
              },
            },
          },
        },
      },
      include: {
        room: true,
      },
    });
    return res.status(200).json({ channel, generalTeam });
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};
