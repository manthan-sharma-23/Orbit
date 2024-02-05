import { Response } from "express";
import {
  DATABASE_ERROR,
  INTERNAL_SERVER_ERROR,
  INVALID_CREDENTIALS,
} from "../../../utils/static/codes.err";
import { ProtectedRequest } from "../../../utils/types";
import { db } from "../../../utils/db";

const addFriend = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;
    const friendId = req.header("friendId");

    if (!userId || !friendId) {
      return res
        .status(INVALID_CREDENTIALS.code)
        .json(INVALID_CREDENTIALS.action);
    }

    const request = await db.friend.create({
      data: {
        senderId: userId,
        receiverId: friendId,
      },
    });

    if (!request) {
      return res.status(DATABASE_ERROR.code).json(DATABASE_ERROR.action);
    }

    return res
      .status(200)
      .json({ message: "friend request sent successfully" });
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};

export default addFriend;
