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
    let query: Partial<Vote> = {
      isUpVoted: false,
      isDownVoted: false,
      isBookmarked: false,
    };

    if (type === FORUM_INTERACTION_OPTIONS.up) {
      query = {
        isUpVoted: true,
        isDownVoted: false,
      };
    } else if (type === FORUM_INTERACTION_OPTIONS.down) {
      query = {
        isDownVoted: true,
        isUpVoted: false,
      };
    } else if (type === FORUM_INTERACTION_OPTIONS.bookmark) {
      query = {
        isBookmarked: true,
      };
    } else if (type === FORUM_INTERACTION_OPTIONS.bookmark_undo) {
      query = {
        isBookmarked: false,
      };
    } else {
      query = {
        isDownVoted: false,
        isUpVoted: false,
      };
    }

    if (!userId || !forumId) throw Error;

    // Update Forum with up_vote increment
    const updateForum = await db.forum.update({
      where: {
        id: forumId,
      },
      data: {
        up_vote: {
          increment: 1,
        },
      },
    });

    // Check if the UserForum entry exists
    const existingUserForum = await db.userForum.findFirst({
      where: {
        userId: userId,
        forumId: forumId,
      },
    });

    // Upsert UserForum entry to indicate upvote
    if (existingUserForum) {
      await db.userForum.update({
        where: {
          id: existingUserForum.id,
        },
        data: {
          ...query,
        },
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
