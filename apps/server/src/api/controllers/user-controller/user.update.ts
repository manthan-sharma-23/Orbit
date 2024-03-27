import { Response } from "express";
import { ProtectedRequest } from "../../../utils/types";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_UPDATED_SUCCESSFULLY,
} from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";

export const updateUserInfo = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;
    const updates = req.body;

    console.log(updates);

    const UpdateUserQuery = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        ...updates,
      },
    });

    return res.status(RESOURCE_UPDATED_SUCCESSFULLY.code).json(UpdateUserQuery);
  } catch (error) {
    return res.sendStatus(INTERNAL_SERVER_ERROR.code);
  }
};
