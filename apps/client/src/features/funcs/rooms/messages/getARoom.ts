import { SERVER_URL } from "@/lib/config/config";
import { ROOM } from "typings";

export const getARoom = async ({ friendId }: { friendId: string }) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/room/${friendId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw Error;

    const data: ROOM = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
