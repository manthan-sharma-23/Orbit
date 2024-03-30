import { SERVER_URL } from "@/lib/config/config";
import { INVITE } from "typings";

export const fetchUserInvites = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/api/invites`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (!response.ok) throw Error;

    const data: INVITE[] = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
