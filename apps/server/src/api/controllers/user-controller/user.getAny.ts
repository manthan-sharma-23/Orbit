import { Response } from "express";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_FOUND_SUCCESSFULLY,
  RESOURCE_NOT_FOUND,
} from "../../../utils/static/codes.err";
import { ProtectedRequest } from "../../../utils/types";
import { db } from "../../../utils/db";

export const getUserById = async (req: ProtectedRequest, res: Response) => {
  try {
    const { userId }: { userId?: string } = req.params;
    const user = await db.user.findUniqueOrThrow({
      where: { id: userId },
    });

    if (!user)
      return res
        .status(RESOURCE_NOT_FOUND.code)
        .json(RESOURCE_NOT_FOUND.action);

    return res.status(RESOURCE_FOUND_SUCCESSFULLY.code).json({ user });
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};
