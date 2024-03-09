import { Response } from "express";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_FOUND_SUCCESSFULLY,
} from "../../../utils/static/codes.err";
import { ProtectedRequest } from "../../../utils/types";
import { db } from "../../../utils/db";
import { USER_SPACE_SCHEMA } from "typings";

export const getUserSpaces = async (req: ProtectedRequest, res: Response) => {
  try {
    console.log("hey");
    const userId = req.user;

    console.log(userId);

    const userSpaceIds: USER_SPACE_SCHEMA[] = await db.userSpace.findMany({
      where: {
        userId: userId,
      },
      include: {
        space: true,
      },
    });

    return res.status(RESOURCE_FOUND_SUCCESSFULLY.code).json(userSpaceIds);
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};
