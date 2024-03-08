import { Response } from "express";
import { ProtectedRequest } from "../../../utils/types";
import {
  INTERNAL_SERVER_ERROR,
  RESOURCE_DELETED_SUCCESSFULLY,
  UNAUTHORIZED_ACCESS,
} from "../../../utils/static/codes.err";
import { db } from "../../../utils/db";
import { TEAM_ROLE, USER } from "typings";

export const remoteChannelMembers = async (
  req: ProtectedRequest,
  res: Response
) => {
  try {
    const userId = req.user;
    const { memberId, channelId } = req.body;

    if (userId !== memberId) {
      const isAdmin: { role: string } = await db.userChannel.findFirstOrThrow({
        where: {
          channelId,
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
    await db.userChannel.deleteMany({
      where: {
        userId: memberId,
        channelId: channelId,
      },
    });

    // Retrieve teams associated with the channel
    const teams = await db.team.findMany({
      where: {
        channelId: channelId,
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

      // Remove user from rooms associated with the team
      const rooms = await db.room.findMany({
        where: {
          team: {
            id: team.id,
          },
        },
        include: {
          users: true,
        },
      });

      // Iterate through each room and remove the user from the users array
      for (const room of rooms) {
        // Filter out the user to be removed from the users array
        const updatedUsers = room.users.filter(
          (user: { id: string }) => user.id !== memberId
        );

        // Update the room with the modified users array
        await db.room.update({
          where: {
            id: room.id,
          },
          data: {
            users: {
              set: updatedUsers,
            },
          },
        });
      }
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
