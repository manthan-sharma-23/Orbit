import { Response } from "express";
import { ProtectedRequest } from "../../../utils/types";
import {
  FORBIDDEN_RESOURCE,
  INTERNAL_SERVER_ERROR,
  INVALID_CREDENTIALS,
  RESOURCE_FOUND_SUCCESSFULLY,
  RESOURCE_NOT_FOUND,
} from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";
export const getSpaceInfo = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;
    if (!userId) return res.sendStatus(FORBIDDEN_RESOURCE.code);

    const { spaceId } = req.params;

    console.log(spaceId);
    if (!spaceId) return res.sendStatus(INVALID_CREDENTIALS.code);

    // fetch space info including only teams where the user is a member
    const space = await db.space.findUniqueOrThrow({
      where: {
        id: spaceId!,
      },
      include: {
        UserSpace: {
          include: {
            user: true,
          },
        },
        teams: {
          where: {
            members: {
              some: {
                userId: userId,
              },
            },
          },
          include: {
            threads: true,
            members: {
              include: {
                user: {
                  select: {
                    name: true,
                    email: true,
                    image: true,
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return res.status(RESOURCE_FOUND_SUCCESSFULLY.code).json(space);
  } catch (error) {
    console.log(error);
    return res.sendStatus(INTERNAL_SERVER_ERROR.code);
  }
};
