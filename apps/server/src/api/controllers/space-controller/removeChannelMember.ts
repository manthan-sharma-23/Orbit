import { Response } from "express";
import { ProtectedRequest } from "../../../utils/types";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_DELETED_SUCCESSFULLY,
  UNAUTHORIZED_ACCESS,
} from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";
import { TEAM_ROLE, USER } from "typings";

export const removeSpaceMember = async (
  req: ProtectedRequest,
  res: Response
) => {
  try {
    const userId = req.user;
    const { memberId, spaceId } = req.body;

    if (userId !== memberId) {
      const isAdmin: { role: string } = await db.userSpace.findFirstOrThrow({
        where: {
          spaceId,
          userId: userId!,
        },
        select: {
          role: true,
        },
      });

      if (!isAdmin || isAdmin.role !== TEAM_ROLE.admin) {
        return res
          .status(UNAUTHORIZED_ACCESS.code)
          .json(UNAUTHORIZED_ACCESS.action);
      }
    }

    // Remove user from the channel
    await db.userSpace.deleteMany({
      where: {
        userId: memberId,
        spaceId: spaceId,
      },
    });

    // Retrieve teams associated with the channel
    const teams = await db.team.findMany({
      where: {
        spaceId: spaceId,
      },
    });

    // Iterate through teams and remove the user from each team
    for (const team of teams) {
      await db.userTeam.deleteMany({
        where: {
          userId: memberId,
          teamId: team.id,
        },
      });
    }

    // Respond with success message
    return res.status(200).json(RESOURCE_DELETED_SUCCESSFULLY.action);
  } catch (error) {
    console.error("Error occurred:", error);
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }
};
