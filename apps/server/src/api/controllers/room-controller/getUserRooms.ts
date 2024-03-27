import { Response } from "express";
import { ProtectedRequest } from "../../../utils/types";
import {
  INTERNAL_SERVER_ERROR,
  INVALID_CREDENTIALS,
  RESOURCE_FOUND_SUCCESSFULLY,
  RESOURCE_NOT_FOUND,
} from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";
import { ROOM } from "typings";
export const getUserRooms = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;

    if (!userId)
      return res
        .status(INVALID_CREDENTIALS.code)
        .json(INVALID_CREDENTIALS.action);
    const rooms = await db.room.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        users: {
          where: {
            NOT: {
              id: userId,
            },
          },
        },
        messages: {
          orderBy: {
            sendAt: "desc",
          },
          take: 1,
        },
      },
    });

    // Now, sort the rooms in memory based on the last message's timestamp
    rooms.sort((a: ROOM, b: ROOM) => {
      const lastMessageA = a.messages[0];
      const lastMessageB = b.messages[0];
      if (!lastMessageA) return 1;
      if (!lastMessageB) return -1;
      return (
        new Date(lastMessageB.sendAt).getTime() -
        new Date(lastMessageA.sendAt).getTime()
      );
    });

    if (!rooms || rooms.length === 0)
      return res
        .status(RESOURCE_NOT_FOUND.code)
        .json(RESOURCE_NOT_FOUND.action);

    return res.status(RESOURCE_FOUND_SUCCESSFULLY.code).json(rooms);
  } catch (error) {
    console.log(error);
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};
