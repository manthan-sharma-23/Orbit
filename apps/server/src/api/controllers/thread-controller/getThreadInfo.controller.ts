import { Request, Response } from "express";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_FOUND_SUCCESSFULLY,
} from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";
import redis from "../../../services/redis/redis.client";
import { THREAD_SCHEMA } from "typings";

export const getThreadInfo = async (req: Request, res: Response) => {
  try {
    const { threadId } = req.params;

    let thread: THREAD_SCHEMA;

    const threadCache = await redis.get("thread_" + threadId);

    if (threadCache) {
      thread = JSON.parse(threadCache.toString());
      return res.status(200).json(thread);
    }

    thread = await db.thread.findUniqueOrThrow({
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

    redis.set(
      "thread_" + thread.id,
      Buffer.from(JSON.stringify(thread), "utf-8"),
      "EX",
      60 * 60 * 4
    );

    return res.status(RESOURCE_FOUND_SUCCESSFULLY.code).json(thread);
  } catch (error) {
    return res.sendStatus(INTERNAL_SERVER_ERROR.code);
  }
};
