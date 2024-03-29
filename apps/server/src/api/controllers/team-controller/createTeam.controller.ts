import { Response } from "express";
import { ProtectedRequest } from "../../../utils/types";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_CONFLICT,
  RESOURCE_CREATED_SUCCESSFULLY,
} from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";
import {
  SPACE_SCHEMA,
  TEAM,
  TEAM_ROLE,
  TEAM_TYPE,
  THREADS_BASE,
} from "typings";

export const createTeam = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;

    const { name, type, spaceId, description } = req.body;

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

    if (
      checkIfUserIsAdminInChannelQuery &&
      checkIfUserIsAdminInChannelQuery.role === TEAM_ROLE.admin
    ) {
      const createTeamQuery: [TEAM] = await db.$transaction([
        db.team.create({
          data: {
            name: name,
            type: type || TEAM_TYPE.inviteOnly,
            description: description || "Another team in Channel",
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

      if (!createTeamQuery[0].id) {
        throw Error;
      }

      await db.$transaction([
        db.thread.create({
          data: {
            name: THREADS_BASE.general.name,
            type: THREADS_BASE.general.type,
            teamId: createTeamQuery[0].id,
          },
        }),
        db.thread.create({
          data: {
            name: THREADS_BASE.announcement.name,
            type: THREADS_BASE.announcement.type,
            teamId: createTeamQuery[0].id,
          },
        }),
      ]);

      const space: SPACE_SCHEMA = await db.space.findFirstOrThrow({
        where: {
          id: spaceId,
        },
        include: {
          teams: {
            include: {
              members: {
                select: {
                  user: {
                    select: {
                      id: true,
                      image: true,
                      name: true,
                      username: true,
                    },
                  },
                  role: true,
                },
              },
            },
          },
          Invites: true,
          UserSpace: true,
        },
      });

      return res.json(space);
    } else {
      return res.sendStatus(402);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(INTERNAL_SERVER_ERROR.code);
  }
};
