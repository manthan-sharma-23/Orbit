import { Response } from "express";
import {
  DATABASE_ERROR,
  INTERNAL_SERVER_ERROR,
  INVALID_CREDENTIALS,
} from "../../../utils/static/codes.err";
import { ProtectedRequest } from "../../../utils/types";
import { db } from "../../../utils/db";
import { FRIEND_REQUEST, FRIEND_REQUEST_STATUS } from "typings";

const addFriend = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;
    const friendId = req.header("friendId");

    if (!userId || !friendId) {
      return res
        .status(INVALID_CREDENTIALS.code)
        .json(INVALID_CREDENTIALS.action);
    }

    let request: FRIEND_REQUEST = await db.friend.findFirst({
      where: {
        senderId: userId,
        receiverId: friendId,
      },
    });

    if (request) {
      request = await db.friend.update({
        where: {
          id: request.id,
        },
        data: {
          status: FRIEND_REQUEST_STATUS.pending,
        },
      });
    } else {
      request = await db.friend.create({
        data: {
          senderId: userId,
          receiverId: friendId,
        },
      });
    }

    return res.status(200).json(request);
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};

export default addFriend;
