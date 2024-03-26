import { Request, Response } from "express";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_FOUND_SUCCESSFULLY,
} from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";
import { ProtectedRequest } from "../../../utils/types";

export const getForumById = async (req: ProtectedRequest, res: Response) => {
  try {
    const { forumId } = req.params;
    const userId = req.user;

    console.log(forumId, userId);
    const fetchForumQuery = await db.forum.findUniqueOrThrow({
      where: {
        id: forumId,
      },
      include: {
        UserForums: {
          where: {
            userId,
          },
          select: {
            isUpVoted: true,
            isDownVoted: true,
            isBookmarked: true,
          },
        },
        comments: {
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
          orderBy: {
            createdAt: "desc",
          },
        },
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

    return res.status(RESOURCE_FOUND_SUCCESSFULLY.code).json(fetchForumQuery);
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};
