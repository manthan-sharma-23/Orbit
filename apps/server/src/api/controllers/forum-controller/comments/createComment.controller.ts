import { Response } from "express";
import { ProtectedRequest } from "../../../../utils/types";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_CREATED_SUCCESSFULLY,
  UNAUTHORIZED_ACCESS,
} from "../../../../utils/static/codes.err";
import { db } from "../../../../utils/db";

export const createCommentToForum = async (
  req: ProtectedRequest,
  res: Response
) => {
  try {
    const userId = req.user;

    const { comment, forumId } = req.body;

    console.log(userId, forumId, comment);

    if (!userId || !forumId || !comment)
      return res.sendStatus(UNAUTHORIZED_ACCESS.code);

    const createCommentQuery = await db.comment.create({
      data: {
        forumId,
        comment,
        userId,
      },
      include: {
        User: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return res
      .status(RESOURCE_CREATED_SUCCESSFULLY.code)
      .json(createCommentQuery);
  } catch (err) {
    console.log(err);
    return res.sendStatus(INTERNAL_SERVER_ERROR.code);
  }
};
