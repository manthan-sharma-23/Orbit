import { Response } from "express";
import { ProtectedRequest } from "../../../utils/types";
import { INTERNAL_SERVER_ERROR } from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";
import { TEXT } from "typings";
import redis from "../../../services/redis/redis.client";

export const fetchMessages = async (req: ProtectedRequest, res: Response) => {
  try {
    const { roomId } = req.params;

    // Build a more descriptive key
    const messageKey = `messages:${roomId}`;

    // Attempt to fetch from Redis with expiration check
    let message = await redis.get(messageKey);
    if (message) {
      try {
        // Parse JSON if necessary
        message = JSON.parse(message);
        return res.json(message);
      } catch (error) {
        console.error("Error parsing cached message:", error);
        // Fall back to database if parsing fails
      }
    }

    // Fetch from database if not cached
    const messages: TEXT[] = await db.message.findMany({
      where: {
        roomId,
      },
      select: {
        sendAt: true,
        userId: true,
        text: true,
      },
    });

    // Cache the retrieved messages with expiration
    await redis.set(messageKey, JSON.stringify(messages), "EX", 60 * 60);

    return res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};
