import { threadAtom } from "@/features/store/atoms/thread.tsx/thread.atom";
import { WebSocketAtom } from "@/features/store/atoms/websockets/ws.atom";
import { WEBSOCKET_URL } from "@/lib/config/config";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { MESSAGE } from "typings";

export const useWebSocket = () => {
  const { threadId } = useParams();
  const [_ws, setWs] = useRecoilState(WebSocketAtom);
  const setThread = useSetRecoilState(threadAtom);

  useEffect(() => {
    const wsInstance = new WebSocket(WEBSOCKET_URL);

    wsInstance.onopen = () => {
      const joinRequest: MESSAGE = {
        type: "JOIN",
        payload: {
          roomId: threadId,
        },
        timeStamp: new Date(),
      };

      wsInstance.send(JSON.stringify(joinRequest));
      setWs(wsInstance);

      wsInstance.addEventListener("message", (msg) => {
        const message: MESSAGE = JSON.parse(msg.data);
        if (message.type === "MESSAGE") {
          // console.log(message);
          if (
            message.payload.threadMessage ||
            message.payload.threadMessage !== undefined
          ) {
            setThread((value) => ({
              ...value,
              messages: [...value.messages, message.payload.threadMessage!],
            }));
          }
        }
      });
    };
    return () => {
      setWs(null);
      wsInstance.close();
    };
  }, [threadId]);

  return _ws;
};
