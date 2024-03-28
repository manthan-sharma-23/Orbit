import { SERVER_URL } from "@/lib/config/config";
import { FRIEND_REQUEST } from "typings";

export const sendAddFriendRequest = async ({
  friendId,
}: {
  friendId: string;
}) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/feature/addfriend`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        friendId,
      },
    });

    if (!response.ok) throw Error;

    const data:FRIEND_REQUEST = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
