import { SERVER_URL } from "@/lib/config/config";

export const acceptInvite = async ({ inviteId }: { inviteId: string }) => {
  try {
    const response = await fetch(
      `${SERVER_URL}/api/invites/accept/${inviteId}`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    if (!response.ok) throw Error;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
