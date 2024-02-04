import { Request, Response } from "express";
import {
  DONT_EXISTS,
  INTERNAL_SERVER_ERROR,
  INVALID_INPUTS,
  USER_LOGGED_IN_SUCCESSFULLY,
} from "../../../utils/errors/codes.err";
import jwt from "jsonwebtoken";
import { db } from "../../../utils/db";
import { SECRET_KEY } from "../../../utils/constants/config";
import { INPUT_LOGIN_FORM, OUTPUT_LOGIN_FORM } from "typings";

export default async function LoginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    INPUT_LOGIN_FORM.parse({ name: "", email, password });

    if (!email || !password)
      return res.status(INVALID_INPUTS.code).json(INVALID_INPUTS.action);

    let user = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) return res.status(DONT_EXISTS.code).json(DONT_EXISTS.action);

    const token = jwt.sign({ userId: user.id }, SECRET_KEY);

    const output: OUTPUT_LOGIN_FORM = {
      ...USER_LOGGED_IN_SUCCESSFULLY.action,
      token,
    };

    return res.status(USER_LOGGED_IN_SUCCESSFULLY.code).json(output);
  } catch (error) {
    console.log(error);
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
}
