import { RoomDetailsAtom } from "@/features/store/atoms/room/room.atom";
import { threadAtom } from "@/features/store/atoms/thread.tsx/thread.atom";
import { WebSocketAtom } from "@/features/store/atoms/websockets/ws.atom";
import { WEBSOCKET_URL } from "@/lib/config/config";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { MESSAGE, TEXT } from "typings";

export const useChatWebSocket = () => {
  const { roomId } = useParams();
  const [_ws, setWs] = useRecoilState(WebSocketAtom);
  const [room, setRoom] = useRecoilState(RoomDetailsAtom);

  useEffect(() => {
    const wsInstance = new WebSocket(WEBSOCKET_URL);

    wsInstance.onopen = () => {
      const joinRequest: MESSAGE = {
        type: "JOIN",
        payload: {
          roomId,
        },
        timeStamp: new Date(),
      };

      wsInstance.send(JSON.stringify(joinRequest));
      setWs(wsInstance);

      wsInstance.addEventListener("message", (msg) => {
        const message: MESSAGE = JSON.parse(msg.data);
        console.log(message);
        if (message.type === "MESSAGE") {
          if (message.payload && message.payload.message !== undefined) {
            setRoom((v) => ({
              ...v,
              messages: [
                ...(v.messages.filter(Boolean) as TEXT[]),
                message.payload.message as TEXT,
              ],
            }));
          }
        }
      });
    };
    return () => {
      setWs(null);
      wsInstance.close();
    };
  }, [roomId]);

  return _ws;
};
