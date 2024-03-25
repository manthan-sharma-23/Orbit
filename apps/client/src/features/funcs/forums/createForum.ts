import { SERVER_URL } from "@/lib/config/config";
import { FORUM } from "typings";

export const createForum = async ({
  title,
  data,
  forum_type,
}: {
  title: string;
  data: string;
  forum_type: string;
}) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/forums/create`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        data,
        forum_type,
      }),
    });

    if (!response.ok) throw Error;

    const result: FORUM = await response.json();

    return result;
  } catch (error) {
    console.log(error);
    return;
  }
};
