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
    const { roomId } = req.params;

    if (!userId || !roomId)
      return res
        .status(INVALID_CREDENTIALS.code)
        .json(INVALID_CREDENTIALS.action);

    const room = await db.room.findFirst({
      where: {
        id: roomId,
      },
      include: {
        users: true,
      },
    });

    if (!room)
      return res.status(CONFLICT_DETECTED.code).json(CONFLICT_DETECTED.action);

    return res
      .status(RESOURCE_FOUND_SUCCESSFULLY.code)
      .json({ ...RESOURCE_FOUND_SUCCESSFULLY.action, room });
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};

export default getRoom;
