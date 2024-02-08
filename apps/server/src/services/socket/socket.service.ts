import { type Server } from "http";
import Redis from "ioredis";
import { MESSAGE, MESSAGE_TYPE } from "typings";
import { WebSocket, WebSocketServer } from "ws";

const publisher = new Redis({ port: 6375 });
const subscriber = new Redis({ port: 6375 });

const channelName = "MESSAGE";

const users: { [key: string]: { roomId: string; socket: WebSocket } } = {};

let counter = 0; //cache counter

export const WebSocketConfig = (server: Server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (socket) => {
    const socketId = counter++;
    console.log("New WebSocket Connected " + wss.clients.keys);

    subscriber.subscribe(channelName, (err, count) => {
      if (err) {
        console.error("Error subscribing:", err);
        return;
      }

      subscriber.on("message", async (channel, message) => {
        if (channel === channelName) {
          const msg: MESSAGE = JSON.parse(message);

          const roomId = users[socketId]?.roomId;
          const text = msg.payload.message;

          Object.keys(users).forEach(async (socketId) => {
            if (users[socketId]?.roomId === roomId) {
              users[socketId]?.socket.send(
                JSON.stringify({
                  type: "MESSAGE",
                  payload: {
                    message: text!,
                  },
                })
              );
            }
          });
        }
      });

      socket.on("message", async (msg) => {
        const message: MESSAGE = JSON.parse(msg.toString());

        if (message.type === MESSAGE_TYPE.join) {
          users[socketId] = {
            roomId: message.payload.roomId!,
            socket,
          };
          socket.send(
            JSON.stringify({ message: "INFO", room: message.payload.roomId })
          );
        }

        if (message.type === MESSAGE_TYPE.message) {
          publisher.publish(channelName, JSON.stringify(message));
        }
      });
    });
  });
};
