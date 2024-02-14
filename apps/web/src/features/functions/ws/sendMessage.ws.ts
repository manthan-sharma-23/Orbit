import { MESSAGE } from "typings";
import { sendMessageToRoomDb } from "../db_calls/sendMessageToRoom";

export const sendMessageTo_WS_SERVER = (
  ws: WebSocket,
  roomId: string,
  userId: string,
  msg: string
) => {
  try {
    const message = {
      sendAt: new Date(),
      userId,
      text: msg,
    };
    if (ws && ws.readyState === WebSocket.OPEN && roomId && userId && msg) {
      const text: MESSAGE = {
        type: "MESSAGE",
        payload: {
          roomId,
          message,
        },
      };
      ws.send(JSON.stringify(text));
      sendMessageToRoomDb(message, roomId);
    }
  } catch (error) {
    console.log(error);
  }
};
