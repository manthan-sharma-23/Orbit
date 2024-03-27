import { SERVER_URL } from "@/lib/config/config";
import { ROOM } from "typings";

export const getRoomDetails = async ({ roomId }: { roomId: string }) => {
  try {
    const response = await fetch(
      `${SERVER_URL}/api/messages/getmessages/${roomId}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json",
        },
      }
    );

    if (!response.ok) throw Error;

    const data: ROOM = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
