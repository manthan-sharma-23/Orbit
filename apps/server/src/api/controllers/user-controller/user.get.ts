import { Response } from "express";
import {
  DONT_EXISTS,
  INTERNAL_SERVER_ERROR,
  USER_LOGGED_IN_SUCCESSFULLY,
} from "../../../utils/errors/codes.err";
import { ProtectedRequest } from "../../../utils/types";
import { db } from "../../../utils/db";

const getUser = async (req: ProtectedRequest, res: Response) => {
  try {
    const user = await db.user.findFirst({
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

    return res
      .status(USER_LOGGED_IN_SUCCESSFULLY.code)
      .json({ ...USER_LOGGED_IN_SUCCESSFULLY.action, user });
  } catch (err) {
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};

export default getUser;
