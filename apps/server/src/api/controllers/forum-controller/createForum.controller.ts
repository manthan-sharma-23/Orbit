import { Response } from "express";
import { ProtectedRequest } from "../../../utils/types";
import { db } from "../../../utils/db/index";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_CREATED_SUCCESSFULLY,
  UNAUTHORIZED_ACCESS,
} from "../../../utils/static/codes.err";

export const createForum = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;
    if (!userId) return res.sendStatus(UNAUTHORIZED_ACCESS.code);

    const { data, title, forum_type } = req.body;

    console.log(data, title, forum_type);

    const createForumQuery = await db.forum.create({
      data: {
        data,
        title,
        userId,
        forum_type: forum_type || "public_discussions",
      },
    });

    return res
      .status(RESOURCE_CREATED_SUCCESSFULLY.code)
      .json(createForumQuery);
  } catch (error) {
    console.log(error);
    return res.sendStatus(INTERNAL_SERVER_ERROR.code);
  }
};
