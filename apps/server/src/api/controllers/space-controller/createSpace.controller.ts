import { Response } from "express";
import {
  FORBIDDEN_RESOURCE,
  INTERNAL_SERVER_ERROR,
  RESOURCE_NOT_MODIFIED,
} from "../../../utils/static/codes.err";
import { ProtectedRequest } from "../../../utils/types";
import { db } from "../../../utils/db";
import { TEAM_ROLE } from "typings";

export const createSpace = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;
    const { space_name, space_description, image } = req.body;

    if (!userId) res.sendStatus(FORBIDDEN_RESOURCE.code);

    const space = await db.space.create({
      data: {
        name: space_name,
        description: space_description,
        image: image || null,
        createdBy: userId,
      },
      select: {
        id: true,
      },
    });

    if (!space.id) return res.sendStatus(RESOURCE_NOT_MODIFIED.code);

    const generalTeam = await db.$transaction([
      db.userSpace.create({
        data: {
          userId: userId!,
          spaceId: space.id,
          role: TEAM_ROLE.admin,
        },
      }),
      db.team.create({
        data: {
          name: "general",
          description: "General Team",
          space: {
            connect: {
              id: space.id,
            },
          },
          members: {
            create: {
              userId: userId!,
              role: TEAM_ROLE.admin,
            },
          },
        },
      }),
    ]);
    return res.status(200).json({ space, team: generalTeam });
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};
