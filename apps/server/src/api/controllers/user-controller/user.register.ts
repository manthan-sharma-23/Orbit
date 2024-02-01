import { Request, Response } from "express";
import {
  INTERNAL_SERVER_ERROR,
  INVALID_INPUTS,
  USER_ALREADY_EXISTS,
  USER_CREATED_SUCCESSFULLY,
} from "../../../utils/errors/codes.err";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { db } from "../../../utils/db";
import { SECRET_KEY } from "../../../utils/constants/config";

export default async function RegisterUser(req: Request, res: Response) {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;

    if (!email || !password)
      return res.status(INVALID_INPUTS.code).json(INVALID_INPUTS.action);

    console.log("running");
    let user = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (user)
      return res
        .status(USER_ALREADY_EXISTS.code)
        .json(USER_ALREADY_EXISTS.action);

    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: user.id }, SECRET_KEY);

    const cookies = cookie.serialize("jwtToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600,
    });

    return res
      .status(USER_CREATED_SUCCESSFULLY.code)
      .json({ ...USER_CREATED_SUCCESSFULLY.action, token });
  } catch (error) {
    console.log(error);
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
}
