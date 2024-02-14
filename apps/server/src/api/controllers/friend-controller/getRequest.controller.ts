import { Response } from "express";
import {
  DATABASE_ERROR,
  INTERNAL_SERVER_ERROR,
  INVALID_CREDENTIALS,
} from "../../../utils/static/codes.err";
import { ProtectedRequest } from "../../../utils/types";
import { db } from "../../../utils/db";
import { USER } from "typings";

const getPendingRequests = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;

    if (!userId) {
      return res
        .status(INVALID_CREDENTIALS.code)
        .json(INVALID_CREDENTIALS.action);
    }

    const rooms: { id: string; senderId: string; receiverId: string }[] =
      await db.friend.findMany({
        where: {
          OR: [{ senderId: userId }, { receiverId: userId }],
          status: "pending",
        },
      });

    const userMap: Record<string, { user: USER; requestId: string }> = {};

    await Promise.all(
      rooms.map(async (room) => {
        const otherUserId =
          room.senderId === userId ? room.receiverId : room.senderId;

        const user = await db.user.findFirst({
          where: {
            id: otherUserId,
          },
        });

        if (user) {
          userMap[otherUserId] = {
            user,
            requestId: room.id,
          };
        }
      })
    );

    const usersWithRequests: Array<{ user: USER; requestId: string }> =
      Object.values(userMap);

    return res.status(200).json(usersWithRequests);
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};

export default getPendingRequests;
