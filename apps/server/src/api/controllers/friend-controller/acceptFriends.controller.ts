import { Response, request } from "express";
import { ProtectedRequest } from "../../../utils/types";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_CONFLICT,
  RESOURCE_NOT_FOUND,
  RESOURCE_UPDATED_SUCCESSFULLY,
} from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";
import { FRIEND_REQUEST, FRIEND_REQUEST_STATUS } from "typings";

const acceptFriend = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;
    const { requestId } = req.params;

    if (!userId || !requestId)
      return res
        .status(RESOURCE_NOT_FOUND.code)
        .json(RESOURCE_NOT_FOUND.action);

    const response: FRIEND_REQUEST = await db.friend.update({
      where: {
        id: requestId,
      },
      data: {
        status: FRIEND_REQUEST_STATUS.accepted,
      },
    });

    const users = [response.senderId, response.receiverId];

    if (!response)
      return res.status(RESOURCE_CONFLICT.code).json(RESOURCE_CONFLICT.action);

    const room = await db.room.create({
      data: {
        users: { connect: users.map((id) => ({ id })) },
      },
    });

    console.log(room);

    return res
      .status(RESOURCE_UPDATED_SUCCESSFULLY.code)
      .json(RESOURCE_UPDATED_SUCCESSFULLY.action);
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};

export default acceptFriend;
