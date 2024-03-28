import { SERVER_URL } from "@/lib/config/config";
import { FRIEND_REQUEST } from "typings";

export const rejectFriend = async ({ requestId }: { requestId: string }) => {
  try {
    const response = await fetch(
      `${SERVER_URL}/api/feature/reject/${requestId}`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    const data: FRIEND_REQUEST[] = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
