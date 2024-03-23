import { addMessageToThread } from "@/features/funcs/threads/addMessageToThread";
import { MESSAGE, THREAD_MESSAGE_SCHEMA } from "typings";

export const sendMessageToThread = ({
  ws,
  threadMessage,
}: {
  ws: WebSocket;
  threadMessage: THREAD_MESSAGE_SCHEMA;
}): boolean => {
  try {
    const signal: MESSAGE = {
      type: "MESSAGE",
      timeStamp: threadMessage.timeStamp!,
      payload: {
        roomId: threadMessage.threadId,
        threadMessage: { id: -1, ...threadMessage },
      },
    };

    ws.send(JSON.stringify(signal));

    addMessageToThread({
      text: threadMessage.data!,
      threadId: threadMessage.threadId!,
      type: "chat",
      timeStamp: threadMessage.timeStamp,
    });

    return true;
  } catch (error) {
    return false;
  }
};
