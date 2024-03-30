import { Response } from "express";
import {
  FORBIDDEN_RESOURCE,
  INTERNAL_SERVER_ERROR,
  RESOURCE_NOT_MODIFIED,
} from "../../../utils/static/codes.err";
import { ProtectedRequest } from "../../../utils/types";
import { db } from "../../../utils/db";
import { TEAM_ROLE, TEAM_TYPE } from "typings";
import { getSpacePicture } from "../../../utils/helper/getRandomImage";
import { createTeam } from "../team-controller/createTeam.controller";

export const createSpace = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;

    console.log("create", userId);
    const { name, description, image } = req.body;

    if (!userId || !name) return res.sendStatus(FORBIDDEN_RESOURCE.code);

    const img = getSpacePicture();

    const space = await db.space.create({
      data: {
        name,
        description,
        image: image || img,
        createdBy: userId,
      },
      select: {
        id: true,
      },
    });

    const userROLE = await db.$transaction([
      db.userSpace.create({
        data: {
          userId: userId!,
          spaceId: space.id,
          role: TEAM_ROLE.admin,
        },
      }),
    ]);

    if (!space.id) return res.sendStatus(RESOURCE_NOT_MODIFIED.code);
    req.body = {
      name: "Townhall",
      description: "The great Townhall discussion",
      spaceId: space.id,
      type: TEAM_TYPE.public,
      color: "#C8AE7D",
    };

    const response = await createTeam(req, res);

    if (response) return;
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};
