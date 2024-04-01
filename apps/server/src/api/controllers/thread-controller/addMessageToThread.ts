import { Request, Response } from "express";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_CREATED_SUCCESSFULLY,
} from "../../../utils/static/codes.err";
import { ProtectedRequest } from "../../../utils/types";
import { db } from "../../../utils/db";
import redis from "../../../services/redis/redis.client";

export const addMessageToThread = async (
  req: ProtectedRequest,
  res: Response
) => {
  try {
    const userId = req.user;

    const { threadId, text, timeStamp, type } = req.body;

    const addMessageToThreadQuery = await db.threadMessage.create({
      data: {
        type,
        data: text,
        userId,
        threadId,
        timeStamp: new Date(timeStamp),
      },
    });

    await redis.del("thread_" + threadId);

    return res
      .status(RESOURCE_CREATED_SUCCESSFULLY.code)
      .json(addMessageToThreadQuery);
  } catch (error) {
    return res.sendStatus(INTERNAL_SERVER_ERROR.code);
  }
};
