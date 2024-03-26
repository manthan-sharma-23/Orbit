import { SERVER_URL } from "@/lib/config/config";

export const voteForum = async ({
  forumId,
  vote_type,
}: {
  forumId: string;
  vote_type?: string;
}) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/forums/vote/${forumId}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        vote_type: vote_type || "",
      },
    });

    if (!response.ok) throw Error;

    const data: { status: boolean } = await response.json();

    return data;
  } catch (error) {
    return false;
  }
};
