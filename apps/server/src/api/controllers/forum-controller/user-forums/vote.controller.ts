import { Response } from "express";
import { ProtectedRequest } from "../../../../utils/types";
import { INTERNAL_SERVER_ERROR } from "../../../../utils/static/codes.err";
import { db } from "../../../../utils/db";
import { FORUM_INTERACTION_OPTIONS } from "typings";

interface Vote {
  isUpVoted: boolean;
  isDownVoted: boolean;
  isBookmarked?: boolean;
}

export const voteForum = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;
    const { forumId } = req.params;
    const type = req.headers["vote_type"];

    if (!userId || !forumId || !type) return res.sendStatus(400); // Bad request if missing parameters

    const existingUserForum = await db.userForum.findFirst({
      where: {
        userId,
        forumId,
      },
    });

    let update_query: any = {};
    let query: Partial<Vote> = {};

    if (type === FORUM_INTERACTION_OPTIONS.up) {
      if (existingUserForum?.isUpVoted) {
        query = {
          isUpVoted: false,
          isDownVoted: false,
        };
        update_query = {
          up_vote: {
            decrement: 1,
          },
        };
      } else {
        query = {
          isUpVoted: true,
          isDownVoted: false,
        };
        update_query = {
          up_vote: {
            increment: 1,
          },
        };
        if (existingUserForum?.isDownVoted) {
          update_query.down_vote = {
            decrement: 1,
          };
        }
      }
    } else if (type === FORUM_INTERACTION_OPTIONS.down) {
      if (existingUserForum?.isDownVoted) {
        query = {
          isUpVoted: false,
          isDownVoted: false,
        };
        update_query = {
          down_vote: {
            decrement: 1,
          },
        };
      } else {
        query = {
          isDownVoted: true,
          isUpVoted: false,
        };
        update_query = {
          down_vote: {
            increment: 1,
          },
        };
        if (existingUserForum?.isUpVoted) {
          update_query.up_vote = {
            decrement: 1,
          };
        }
      }
    } else if (type === FORUM_INTERACTION_OPTIONS.bookmark) {
      query = {
        isBookmarked: true,
      };
    } else if (type === FORUM_INTERACTION_OPTIONS.bookmark_undo) {
      query = {
        isBookmarked: false,
      };
    } else {
      return res.sendStatus(400); // Bad request if unknown interaction type
    }

    // Update Forum with up_vote or down_vote increment/decrement based on type
    await db.forum.update({
      where: {
        id: forumId,
      },
      data: update_query,
    });

    // Update UserForum entry to indicate vote or bookmark
    if (existingUserForum) {
      await db.userForum.update({
        where: {
          id: existingUserForum.id,
        },
        data: query,
      });
    } else {
      await db.userForum.create({
        data: {
          userId,
          forumId,
          ...query,
        },
      });
    }

    return res.status(200).json({ status: true }); // Sending success response
  } catch (error) {
    console.error("Error:", error);
    return res.sendStatus(INTERNAL_SERVER_ERROR.code);
  }
};
