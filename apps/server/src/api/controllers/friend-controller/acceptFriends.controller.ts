import { Response, request } from "express";
import { ProtectedRequest } from "../../../utils/types";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_CONFLICT,
  RESOURCE_NOT_FOUND,
  RESOURCE_UPDATED_SUCCESSFULLY,
} from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";
import { FRIEND, FRIEND_REQUEST, FRIEND_REQUEST_STATUS } from "typings";

const acceptFriend = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;
    const { requestId } = req.params;

    if (!userId || !requestId)
      return res
        .status(RESOURCE_NOT_FOUND.code)
        .json(RESOURCE_NOT_FOUND.action);

    // check that correct user is manipulating request
    await db.friend.findFirstOrThrow({
      where: {
        receiverId: userId,
        id: requestId,
      },
    });

    await db.friend.update({
      where: {
        id: requestId,
      },
      data: {
        status: FRIEND_REQUEST_STATUS.accepted,
      },
    });

    const response = await db.friend.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
    });

    if (!response)
      return res.status(RESOURCE_CONFLICT.code).json(RESOURCE_CONFLICT.action);

    return res
      .status(RESOURCE_UPDATED_SUCCESSFULLY.code)
      .json( response );
  } catch (error) {
    console.log(error);
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};

export default acceptFriend;
