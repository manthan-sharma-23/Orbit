import { SERVER_URL } from "@/lib/config/config";
import { THREAD_MESSAGE_SCHEMA, THREAD_MESSAGE_TYPE } from "typings";

export const addMessageToThread = async ({
  type,
  threadId,
  text,
  timeStamp,
}: {
  type: THREAD_MESSAGE_TYPE;
  threadId: string;
  text: string;
  timeStamp: Date;
}) => {
  try {
    const res = await fetch(`${SERVER_URL}/api/threads/addMessage`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        threadId,
        timeStamp,
        text,
      }),
    });

    const data: THREAD_MESSAGE_SCHEMA = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
