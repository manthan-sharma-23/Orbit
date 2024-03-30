import { SERVER_URL } from "@/lib/config/config";
import { INVITE } from "typings";

export const createInvite = async ({
  teamId,
  spaceId,
  to,
}: {
  teamId: string;
  spaceId: string;
  to: string;
}) => {
  try {
    const response = await fetch(
      `${SERVER_URL}/api/invites/create_invite_team`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teamId,
          spaceId,
          to,
        }),
      }
    );

    if (!response.ok) throw Error;

    return (await response.json()) as INVITE;
  } catch (error) {
    console.log(error);
    return null;
  }
};
