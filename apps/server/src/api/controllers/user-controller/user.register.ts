import { Request, Response } from "express";
import {
  INTERNAL_SERVER_ERROR,
  INVALID_INPUTS,
  USER_ALREADY_EXISTS,
  USER_CREATED_SUCCESSFULLY,
} from "../../../utils/static/codes.err";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { INPUT_LOGIN_FORM, OUTPUT_LOGIN_FORM } from "typings";
import { db } from "../../../utils/db";
import { SECRET_KEY } from "../../../utils/constants/config";
import { z } from "zod";
import { getProfilePicture } from "../../../utils/helper/getRandomImage";

export default async function RegisterUser(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body as INPUT_LOGIN_FORM;

    await INPUT_LOGIN_FORM.parse(req.body);

    if (!email || !password)
      return res.status(INVALID_INPUTS.code).json(INVALID_INPUTS.action);

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
    const image = getProfilePicture();
    const username = "@" + email.split("@")[0];

    user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        image,
        username,
      },
    });

    const token = jwt.sign({ userId: user.id }, SECRET_KEY);

    const cookies = cookie.serialize("jwtToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600,
    });

    const output: OUTPUT_LOGIN_FORM = {
      ...USER_CREATED_SUCCESSFULLY.action,
      token,
    };

    return res.status(USER_CREATED_SUCCESSFULLY.code).json(output);
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
}
