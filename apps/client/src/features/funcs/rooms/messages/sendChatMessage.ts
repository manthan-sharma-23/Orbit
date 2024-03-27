import { SERVER_URL } from "@/lib/config/config";
import { TEXT } from "typings";

export const sendChatMessage = async ({
  roomId,
  message,
}: {
  roomId: string;
  message: TEXT;
}) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/messages/sendmessage`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId, message }),
    });

    if (!response.ok) throw Error;

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
