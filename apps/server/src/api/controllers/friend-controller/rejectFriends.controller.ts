import { Response } from "express";
import { ProtectedRequest } from "../../../utils/types";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_CONFLICT,
  RESOURCE_NOT_FOUND,
  RESOURCE_UPDATED_SUCCESSFULLY,
} from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";
import { FRIEND_REQUEST_STATUS } from "typings";

const rejectFriend = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;
    const { requestId } = req.params;

    if (!userId || !requestId)
      return res
        .status(RESOURCE_NOT_FOUND.code)
        .json(RESOURCE_NOT_FOUND.action);

    await db.friend.findFirstOrThrow({
      where: {
        receiverId: userId,
        id: requestId,
      },
    });

    const debg = await db.friend.update({
      where: {
        id: requestId,
      },
      data: {
        status: FRIEND_REQUEST_STATUS.rejected,
      },
    });
    console.log(debg);

    const response = await db.friend.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
    });

    if (!response)
      return res.status(RESOURCE_CONFLICT.code).json(RESOURCE_CONFLICT.action);

    return res.status(RESOURCE_UPDATED_SUCCESSFULLY.code).json(response);
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};

export default rejectFriend;
