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
    const getForumsQuery = await db.forum.findMany({
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

    return res.status(RESOURCE_CREATED_SUCCESSFULLY.code).json(getForumsQuery);
  } catch (error) {
    console.log(error);
    return res.sendStatus(INTERNAL_SERVER_ERROR.code);
  }
};
