import { NextFunction, Response } from "express";
import { ProtectedRequest } from "../../utils/types";
import { db } from "../../utils/db";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_NOT_FOUND,
} from "../../utils/static/codes.err";
import { TEAM_ROLE } from "typings";

export const ValidateUserSpace = async (
  req: ProtectedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user;
    const { spaceId } = req.body;

    if (!spaceId) return res.sendStatus(RESOURCE_NOT_FOUND.code);

    await db.userSpace.findFirstOrThrow({
      where: {
        userId,
        spaceId,
        role: TEAM_ROLE.admin || TEAM_ROLE.coadmin,
      },
    });

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(INTERNAL_SERVER_ERROR.code);
  }
};
