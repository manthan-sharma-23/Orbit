import { Response } from "express";
import {
  DONT_EXISTS,
  INTERNAL_SERVER_ERROR,
  USER_LOGGED_IN_SUCCESSFULLY,
} from "../../../utils/errors/codes.err";
import { ProtectedRequest } from "../../../utils/types";
import { db } from "../../../utils/db";
import { OUTPUT_GET_USER, USER } from "typings";

const getUser = async (req: ProtectedRequest, res: Response) => {
  try {
    const user: USER = await db.user.findFirst({
      where: {
        id: req.user,
      },
      select: {
        name: true,
        email: true,
        image: true,
        emailVerified: true,
      },
    });

    if (!user) return res.status(DONT_EXISTS.code).json(DONT_EXISTS.action);

    const output: OUTPUT_GET_USER = {
      ...USER_LOGGED_IN_SUCCESSFULLY.action,
      user,
    };

    return res.status(USER_LOGGED_IN_SUCCESSFULLY.code).json(output);
  } catch (err) {
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};

export default getUser;
