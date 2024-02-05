import { Response } from "express";
import {
  DONT_EXISTS,
  INTERNAL_SERVER_ERROR,
  USER_LOGGED_IN_SUCCESSFULLY,
} from "../../../utils/static/codes.err";
import { ProtectedRequest } from "../../../utils/types";
import { db } from "../../../utils/db";
import { OUTPUT_GET_USER, USER } from "typings";

const getUser = async (req: ProtectedRequest, res: Response) => {
  try {
    const id = req.user;

    if (!id) return;

    const user = await db.user.findFirst({
      where: {
        id,
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
