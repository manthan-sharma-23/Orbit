import { type Server } from "http";
import { MESSAGE } from "typings";
import { WebSocket, WebSocketServer } from "ws";

const users: { [key: string]: { roomId: string; ws: WebSocket } } = {};
// {
//   "user1":{
//     roomId:"",
//     ws:""
//   },
//   "user2":{
//     roomId:"",
//     ws:""
//   },
//   "user3":{
//     roomId:"",
//     ws:""
//   },
// }

let counter = 0;

export const WebSocketConfig = (server: Server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    const wsId = counter++;
    console.log("New WebSocket Connected " + wss.clients.keys);

    // MESSAGE TYPE
    // {
    //   type:"",
    //   payload:{}
    // }

    ws.on("message", async (msg) => {
      const message: MESSAGE = JSON.parse(msg.toString());

      if (message.type === "JOIN") {
        users[wsId] = {
          roomId: message.payload.roomId!,
          ws,
        };
        ws.send("Joined room " + message.payload.roomId);
      }

      if (message.type === "MESSAGE") {
        const roomId = users[wsId]?.roomId;
        const text = message.payload.message;
        Object.keys(users).forEach((wsId) => {
          if (users[wsId]?.roomId === roomId) {
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
