import { Response } from "express";
import { ProtectedRequest } from "../../../utils/types";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_FOUND_SUCCESSFULLY,
  UNAUTHORIZED_ACCESS,
} from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";
import { MAIL } from "typings";

// No invites only mails

export const getUserMails = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;
    if (!userId) return res.sendStatus(UNAUTHORIZED_ACCESS.code);

    const getUserMailsQuery: MAIL[] = await db.mail.findMany({
      where: {
        to: userId,
      },
      include: {
        User: true,
        Invite: {
          include: {
            Space: true,
            Team: true,
          },
        },
      },
    });

    return res.status(RESOURCE_FOUND_SUCCESSFULLY.code).json(getUserMailsQuery);
  } catch (error) {
    console.log(error);
    return res.sendStatus(INTERNAL_SERVER_ERROR.code);
  }
};
