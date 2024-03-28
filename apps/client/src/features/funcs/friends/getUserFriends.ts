import { SERVER_URL } from "@/lib/config/config";
import { FRIEND_REQUEST } from "typings";

export const getUserFriends = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/api/feature/friends`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (!response.ok) throw Error;

    const data: FRIEND_REQUEST[] = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
