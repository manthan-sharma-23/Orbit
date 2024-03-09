import { Response } from "express";
import { ProtectedRequest } from "../../../utils/types";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_CONFLICT,
  RESOURCE_CREATED_SUCCESSFULLY,
  RESOURCE_NOT_MODIFIED,
} from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";
import { TEAM_ROLE, TEAM_TYPE } from "typings";

export const createTeam = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;

    const { name, type, spaceId } = req.body;

    if (!spaceId) return res.sendStatus(RESOURCE_CONFLICT.code);

    const checkIfUserIsAdminInChannelQuery: { role: TEAM_ROLE } =
      await db.userSpace.findFirstOrThrow({
        where: {
          spaceId,
          userId: userId!,
        },
        select: {
          role: true,
        },
      });

    console.log(checkIfUserIsAdminInChannelQuery);
    if (
      checkIfUserIsAdminInChannelQuery &&
      checkIfUserIsAdminInChannelQuery.role === TEAM_ROLE.admin
    ) {
      const createTeamQuery = await db.$transaction([
        db.team.create({
          data: {
            name: name,
            type: type || TEAM_TYPE.inviteOnly,
            description: "Another team in Channel",
            space: {
              connect: {
                id: spaceId,
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

      return res
        .status(RESOURCE_CREATED_SUCCESSFULLY.code)
        .json(createTeamQuery);
    } else {
      return res
        .status(402)
        .json({ message: "User not found or not permitted" });
    }
  } catch (error) {
    return res.sendStatus(INTERNAL_SERVER_ERROR.code);
  }
};
