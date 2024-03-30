import { Response } from "express";
import { ProtectedRequest } from "../../../utils/types";
import { INTERNAL_SERVER_ERROR } from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";

export const getTownHall = async (req: ProtectedRequest, res: Response) => {
  try {
    const { spaceId } = req.params;

    const townhall = await db.team.findFirstOrThrow({
      where: {
        AND: [
          {
            spaceId,
          },
          {
            name: "Townhall",
          },
        ],
      },
      include: {
        threads: true,
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                username: true,
                job: true,
              },
            },
          },
        },
        Invites: true,
      },
    });

    return res.status(200).json(townhall);
  } catch (error) {
    console.log(error);
    return res.sendStatus(INTERNAL_SERVER_ERROR.code);
  }
};
