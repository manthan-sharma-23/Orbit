import { Response } from "express";
import { ProtectedRequest } from "../../../utils/types";
import {
  INTERNAL_SERVER_ERROR,
  INVALID_CREDENTIALS,
  MESSAGE_SENT_SUCCESSFULLY,
  RESOURCE_CONFLICT,
} from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";

export const sendMessageToDB = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user!;
    let { roomId, message } = req.body;

    if (!userId || !roomId) {
      return res.sendStatus(INVALID_CREDENTIALS.code);
    }

    const date = new Date(message.sendAt);

    const response = await db.message.create({
      data: {
        userId,
        roomId,
        text: message.text,
        sendAt: date,
      },
      select: {
        text: true,
        sendAt: true,
        userId: true,
      },
    });

    if (!response) return res.sendStatus(RESOURCE_CONFLICT.code);

    return res
      .status(MESSAGE_SENT_SUCCESSFULLY.code)
      .json({ ...MESSAGE_SENT_SUCCESSFULLY.action, message: response });
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};
