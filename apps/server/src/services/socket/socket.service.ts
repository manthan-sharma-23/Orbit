import { type Server } from "http";
import { WebSocket, WebSocketServer } from "ws";
import redisClient from "../redis/redis";

export const WebSocketConfig = (server: Server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log(wss.clients.keys);

    ws.on("message", async (msg) => {
      const message: { room: string; message: string } = JSON.parse(
        msg.toString()
      );

      const redis = redisClient;

      await redis.publish(message.room, message.message);
    });
  });
};
