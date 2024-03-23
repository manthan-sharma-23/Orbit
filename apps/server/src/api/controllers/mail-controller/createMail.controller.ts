import { Response } from "express";
import { ProtectedRequest } from "../../../utils/types";
import {
  INTERNAL_SERVER_ERROR,
  INVALID_CREDENTIALS,
  RESOURCE_CREATED_SUCCESSFULLY,
  UNAUTHORIZED_ACCESS,
} from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";
import { MAIL } from "typings";

// No invites only mails

export const createMail = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;
    if (!userId) return res.sendStatus(UNAUTHORIZED_ACCESS.code);

    const { data, to, from, title, description } = req.body;

    if (!data || !to || !from)
      return res
        .status(INVALID_CREDENTIALS.code)
        .json(INVALID_CREDENTIALS.action);

    const createMailQuery: MAIL = await db.mail.create({
      data: {
        data,
        to,
        from,
        title: title || "Some Mail",
        description,
        userId,
      },
    });

    return res.status(RESOURCE_CREATED_SUCCESSFULLY.code).json(createMailQuery);
  } catch (error) {
    console.log(error);
    return res.sendStatus(INTERNAL_SERVER_ERROR.code);
  }
};
