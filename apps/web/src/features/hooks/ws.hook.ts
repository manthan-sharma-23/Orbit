import { useEffect, useState } from "react";
import { WEBSOCKET_URL } from "../../utils/constants/config";
import { FRIEND, MESSAGE, TEXT } from "typings";
import { SetterOrUpdater } from "recoil";

export const useListenWebSocket = (
  roomId: string,
  setRoom: SetterOrUpdater<{
    friend: FRIEND | null;
    MESSAGES?: TEXT[];
  }>
) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  useEffect(() => {
    const wsInstance = new WebSocket(WEBSOCKET_URL);

    wsInstance.onopen = () => {
      setWs(wsInstance);
      wsInstance.send(
        JSON.stringify({
          type: "JOIN",
          payload: {
            roomId,
          },
        })
      );

      wsInstance.addEventListener("message", (msg) => {
        const text: MESSAGE = JSON.parse(msg.data);

        console.log(text)

        if (text.type === "MESSAGE" && text.payload.message) {
          const newMessage: TEXT = {
            sendAt: text.payload.message.sendAt,
            userId: text.payload.message.userId,
            text: text.payload.message.text,
          };
          setRoom((prev) => ({
            ...prev,
            MESSAGES: [...prev.MESSAGES!, newMessage],
          }));
        }
      });
    };

    return () => {
      if (wsInstance) {
        wsInstance.close();
      }
    };
  }, []);

  return ws;
};
