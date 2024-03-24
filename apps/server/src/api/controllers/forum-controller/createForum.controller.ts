import { Response } from "express";
import { ProtectedRequest } from "../../../utils/types";
import {
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED_ACCESS,
} from "../../../utils/static/codes.err";

export const createForum = (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;
    if (!userId) return res.sendStatus(UNAUTHORIZED_ACCESS.code);
  } catch (error) {
    console.log(error);
    return res.sendStatus(INTERNAL_SERVER_ERROR.code);
  }
};
