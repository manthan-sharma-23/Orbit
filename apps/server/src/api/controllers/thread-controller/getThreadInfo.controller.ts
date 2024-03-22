import { Request, Response } from "express";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_FOUND_SUCCESSFULLY,
} from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";

export const getThreadInfo = async (req: Request, res: Response) => {
  try {
    const { threadId } = req.params;
    const getThreadInfoQuery = await db.thread.findUniqueOrThrow({
      where: {
        id: threadId,
      },
      include: {
        messages: {
          include: {
            User: {
              select: {
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
      },
    });

    return res
      .status(RESOURCE_FOUND_SUCCESSFULLY.code)
      .json(getThreadInfoQuery);
  } catch (error) {
    return res.sendStatus(INTERNAL_SERVER_ERROR.code);
  }
};
