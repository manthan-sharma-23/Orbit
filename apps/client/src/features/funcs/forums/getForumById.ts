import { SERVER_URL } from "@/lib/config/config";
import { FORUM } from "typings";

export const getForumById = async ({ forumId }: { forumId: string }) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/forums/${forumId}`);

    if (!response.ok) return null;

    const result: FORUM = await response.json();

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
