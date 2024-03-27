import { Response } from "express";
import { ProtectedRequest } from "../../../utils/types";
import { INTERNAL_SERVER_ERROR } from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";
import { TEXT } from "typings";

export const fetchMessages = async (req: ProtectedRequest, res: Response) => {
  try {
    const { userId } = req.params;
    const { roomId } = req.params;
    console.log(roomId);
    const messages = await db.room.findUniqueOrThrow({
      where: {
        id: roomId,
      },
      include: {
        messages: true,
        users: true,
      },
    });

    if (!messages || messages.length === 0) return res.sendStatus(304);

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};
