import { Response } from "express";
import {
  INTERNAL_SERVER_ERROR,
  INVALID_CREDENTIALS,
  RESOURCE_CONFLICT,
  RESOURCE_FOUND_SUCCESSFULLY,
} from "../../../utils/static/codes.err";
import {  ProtectedRequest } from "../../../utils/types";
import { db } from "../../../utils/db";
import { FRIEND_REQUEST_STATUS } from "typings";

const getFriends = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;

    if (!userId)
      return res
        .status(INVALID_CREDENTIALS.code)
        .json(INVALID_CREDENTIALS.action);

    const friends = await db.friend.findMany({
      where: {
        OR: [
          {
            senderId: userId,
          },
          {
            receiverId: userId,
          },
        ],
        status: FRIEND_REQUEST_STATUS.accepted,
      },
    });

    if (!friends)
      return res.status(RESOURCE_CONFLICT.code).json(RESOURCE_CONFLICT.action);

    return res
      .status(RESOURCE_FOUND_SUCCESSFULLY.code)
      .json(RESOURCE_FOUND_SUCCESSFULLY.action);
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};

export default getFriends;
