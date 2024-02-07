import { Response } from "express";
import { ProtectedRequest } from "../../../utils/types";
import { INTERNAL_SERVER_ERROR } from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";
import { TEXT } from "typings";

export const fetchMessages = async (req: ProtectedRequest, res: Response) => {
  try {
    const { roomId } = req.params;

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

    return res.json(messages);
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};
