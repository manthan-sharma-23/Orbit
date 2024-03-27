import { Response } from "express";
import {
  CONFLICT_DETECTED,
  INTERNAL_SERVER_ERROR,
  INVALID_CREDENTIALS,
  RESOURCE_FOUND_SUCCESSFULLY,
} from "../../../utils/static/codes.err";
import { ProtectedRequest } from "../../../utils/types";
import { db } from "../../../utils/db";

const getRoom = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;
    const { friendUserId } = req.params;

    if (!userId || !friendUserId)
      return res
        .status(INVALID_CREDENTIALS.code)
        .json(INVALID_CREDENTIALS.action);

    let room;

    room = await db.room.findFirst({
      where: {
        AND: [
          { users: { some: { id: userId } } },
          { users: { some: { id: friendUserId } } },
        ],
      },
      include: {
        users: true,
      },
    });

    if (!room) {
      room = await db.room.create({
        data: {
          users: {
            connect: [{ id: userId }, { id: friendUserId }],
          },
        },
        include: {
          users: true,
        },
      });
    }

    return res.status(RESOURCE_FOUND_SUCCESSFULLY.code).json(room);
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};

export default getRoom;
