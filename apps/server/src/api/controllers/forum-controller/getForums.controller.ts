import { Request, Response } from "express";
import {
  INTERNAL_SERVER_ERROR,
  INVALID_CREDENTIALS,
  RESOURCE_CREATED_SUCCESSFULLY,
  UNAUTHORIZED_ACCESS,
} from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";

export const getForums = async (req: Request, res: Response) => {
  try {
    const forum_type = req.headers["forum_type"];

    let getForumsQuery: any;

    if (forum_type && forum_type !== "general") {
      getForumsQuery = await db.forum.findMany({
        where: {
          isActive: true,
          forum_type: forum_type as string,
        },
        orderBy: {
          createdAt: "desc",
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
          comments: true,
        },
      });
    } else {
      getForumsQuery = await db.forum.findMany({
        where: {
          isActive: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          User: {
            select: {
              name: true,
              email: true,
              image: true,
            },
          },
          comments: true,
        },
      });
    }

    return res.status(RESOURCE_CREATED_SUCCESSFULLY.code).json(getForumsQuery);
  } catch (error) {
    console.log(error);
    return res.sendStatus(INTERNAL_SERVER_ERROR.code);
  }
};
