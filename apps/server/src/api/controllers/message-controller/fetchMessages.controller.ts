import { Response } from "express";
import { ProtectedRequest } from "../../../utils/types";
import { INTERNAL_SERVER_ERROR } from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";
import { ROOM, TEXT } from "typings";
import redis from "../../../services/redis/redis.client";

export const fetchMessages = async (req: ProtectedRequest, res: Response) => {
  try {
    const { userId } = req.params;
    const { roomId } = req.params;
    let room: ROOM;

    const cache = await redis.get("chat_" + roomId);

    if (cache) {
      room = JSON.parse(cache.toString());
      return res.status(200).json(room);
    }

    room = await db.room.findUniqueOrThrow({
      where: {
        id: roomId,
      },
      include: {
        messages: true,
        users: true,
      },
    });

    await redis.set(
      "chat_" + roomId,
      Buffer.from(JSON.stringify(room), "utf-8"),
      "EX",
      60 * 60 * 4
    );

    if (!room || room.messages.length === 0) return res.sendStatus(304);

    return res.status(200).json(room);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};
