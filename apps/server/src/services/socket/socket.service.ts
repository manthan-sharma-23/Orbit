import { type Server } from "http";
import { WebSocket, WebSocketServer } from "ws";

const users: { [key: string]: { room: string; ws: any } } = {};

let counter = 0;

export const WebSocketConfig = (server: Server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    const wsId = counter++;
    console.log(wss.clients.keys);

    // MESSAGE TYPE
    // {
    //   type:"",
    //   payload:""
    // }

    ws.on("message", async (msg) => {
      const message: {
        payload: { room?: string; message?: string };
        type: string;
      } = JSON.parse(msg.toString());

      if (message.type === "JOIN") {
        users[wsId] = {
          room: message.payload.room!,
          ws,
        };
      }

      if (message.type === "MESSAGE") {
        const roomId = users[wsId]?.room;
        const text = message.payload.message;

        Object.keys(users).forEach((wsId) => {
          if (users[wsId]?.room === roomId) {
            users[wsId]?.ws.send(
              JSON.stringify({
                type: "MESSAGE",
                payload: {
                  message: text,
                },
              })
            );
          }
        });
      }
    });
  });
};
