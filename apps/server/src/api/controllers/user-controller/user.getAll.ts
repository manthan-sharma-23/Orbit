import { Response } from "express";
import { ProtectedRequest } from "../../../utils/types";
import { db } from "../../../utils/db";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_FOUND_SUCCESSFULLY,
  RESOURCE_NOT_FOUND,
} from "../../../utils/static/codes.err";
import { USER } from "typings";

const getAllUsers = async (req: ProtectedRequest, res: Response) => {
  try {
    const id = req.user;

    if (!id) return;

    const user: USER[] = await db.user.findMany({
      where: {
        view: "public",
      },
    });

    if (!user) return res.sendStatus(RESOURCE_NOT_FOUND.code);

    return res.status(RESOURCE_FOUND_SUCCESSFULLY.code).json(user);
  } catch (err) {
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};

export default getAllUsers;
