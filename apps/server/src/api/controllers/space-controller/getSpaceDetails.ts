import { Response } from "express";
import { ProtectedRequest } from "../../../utils/types";
import { INTERNAL_SERVER_ERROR } from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";

export const getSpaceDetails = async (req: ProtectedRequest, res: Response) => {
  try {
    const { spaceId } = req.params;

    console.log("this controller");
    const spaceDetails = await db.space.findUniqueOrThrow({
      where: {
        id: spaceId,
      },
      include: {
        UserSpace: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true,
              },
            },
          },
        },
        Invites: true,
        teams: true,
      },
    });  

    return res.status(200).json(spaceDetails);
  } catch (error) {
    console.log(error);
    return res.sendStatus(INTERNAL_SERVER_ERROR.code);
  }
};
