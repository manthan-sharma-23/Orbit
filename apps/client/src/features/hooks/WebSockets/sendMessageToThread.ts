import { addMessageToThread } from "@/features/funcs/threads/addMessageToThread";
import { MESSAGE, THREAD_MESSAGE_SCHEMA, USER } from "typings";

export const sendMessageToThread = ({
  ws,
  threadMessage,
  user,
}: {
  ws: WebSocket;
  threadMessage: THREAD_MESSAGE_SCHEMA;
  user: Partial<USER>;
}): boolean => {
  try {
    const signal: MESSAGE = {
      type: "MESSAGE",
      timeStamp: threadMessage.timeStamp!,
      payload: {
        roomId: threadMessage.threadId,
        threadMessage: { id: -1, ...threadMessage, User: user },
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
