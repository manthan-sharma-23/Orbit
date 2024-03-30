import { Response } from "express";
import { ProtectedRequest } from "../../../utils/types";
import { db } from "../../../utils/db";
import { INVITE } from "typings";

export const getUserInvites = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;

    const fetchInvites: INVITE[] = await db.invite.findMany({
      where: {
        to: userId,
        status: false,
        isRejected: false,
      },
      include: {
        Space: true,
        Team: true,
      },
    });

    return res.status(200).json(fetchInvites);
  } catch (error) {
    console.log(error);
    return null;
  }
};
