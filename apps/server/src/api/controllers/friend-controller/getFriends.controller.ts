import { Response } from "express";
import {
  INTERNAL_SERVER_ERROR,
  INVALID_CREDENTIALS,
  RESOURCE_CONFLICT,
  RESOURCE_FOUND_SUCCESSFULLY,
} from "../../../utils/static/codes.err";
import { ProtectedRequest } from "../../../utils/types";
import { db } from "../../../utils/db";
import { FRIEND, FRIEND_REQUEST, FRIEND_REQUEST_STATUS } from "typings";

const getFriends = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;

    if (!userId)
      return res
        .status(INVALID_CREDENTIALS.code)
        .json(INVALID_CREDENTIALS.action);

    const friendsAccepted: FRIEND_REQUEST[] = await db.friend.findMany({
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

    const friendIDs: string[] = friendsAccepted.map((friend) => {
      if (friend.receiverId !== userId) {
        return friend.receiverId;
      }
      return friend.senderId;
    });

    const friends: Partial<FRIEND>[] = await Promise.all(
      friendIDs.map(async (id) => {
        const friend: FRIEND = await db.user.findFirst({
          where: {
            id,
          },
          select: {
            name: true,
            email: true,
            image: true,
          },
        });
        return friend;
      })
    );

    if (!friends)
      return res.status(RESOURCE_CONFLICT.code).json(RESOURCE_CONFLICT.action);

    return res
      .status(RESOURCE_FOUND_SUCCESSFULLY.code)
      .json({ ...RESOURCE_FOUND_SUCCESSFULLY.action, friends });
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};

export default getFriends;
