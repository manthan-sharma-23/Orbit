import { SERVER_URL } from "@/lib/config/config";
import { COMMENT } from "typings";

export const createCommentToForum = async ({
  comment,
  forumId,
}: {
  comment: string;
  forumId: string;
}) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/forums/comment`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment, forumId }),
    });

    if (!response.ok) throw Error;

    const data: COMMENT = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
