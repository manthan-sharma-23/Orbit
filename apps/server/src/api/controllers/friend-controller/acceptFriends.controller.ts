import { Response, request } from "express";
import { ProtectedRequest } from "../../../utils/types";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_CONFLICT,
  RESOURCE_NOT_FOUND,
  RESOURCE_UPDATED_SUCCESSFULLY,
} from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";
import {
  FRIEND_REQUEST,
  FRIEND_REQUEST_STATUS,
  ROOM,
  ROOM_TYPE,
} from "typings";

const acceptFriend = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;
    const { requestId } = req.params;

    if (!userId || !requestId)
      return res
        .status(RESOURCE_NOT_FOUND.code)
        .json(RESOURCE_NOT_FOUND.action);

    const friendRequest: FRIEND_REQUEST = await db.friend.findFirst({
      where: {
        id: requestId,
      },
    });

    if (!friendRequest)
      return res
        .status(RESOURCE_NOT_FOUND.code)
        .json(RESOURCE_NOT_FOUND.action);

    const roomers = [friendRequest.senderId, friendRequest.receiverId];

    const room: ROOM = await db.room.create({
      data: {
        users: {
          connect: roomers.map((id) => ({ id })),
        },
      },
    });

    const response: FRIEND_REQUEST = await db.friend.update({
      where: {
        id: requestId,
      },
      data: {
        roomId: room.id,
        status: FRIEND_REQUEST_STATUS.accepted,
      },
      select: {
        status: true,
        roomId: true,
        updatedAt: true,
      },
    });

    if (!response)
      return res.status(RESOURCE_CONFLICT.code).json(RESOURCE_CONFLICT.action);

    return res
      .status(RESOURCE_UPDATED_SUCCESSFULLY.code)
      .json({ ...RESOURCE_UPDATED_SUCCESSFULLY.action, response });
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};

export default acceptFriend;
