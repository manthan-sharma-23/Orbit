import http from "http";
import { MESSAGE } from "typings";
import { WebSocket, WebSocketServer } from "ws";
import { SocketUserMap } from "../../utils/types";
import client from "../redis/redis.client";
import RedisClient from "../redis/redis.service";
import { MESSAGE_CHANNEL, REDIS_PORT } from "../../utils/constants/config";

const publisher = new RedisClient(REDIS_PORT).client;
const subscriber = new RedisClient(REDIS_PORT).client;
subscriber.subscribe(MESSAGE_CHANNEL);
export default class SocketService {
  private _wss: WebSocketServer;
  private _counter: number = 0;
  private _users: Map<number, SocketUserMap> = new Map();
  private _prev_message: string = "";

  constructor(server: http.Server) {
    this._wss = new WebSocketServer({ server });
  }

  public listenWebSocketEvents(wss: WebSocketServer) {
    wss.on("connection", (socket) => {
      const socketId = this._counter++;
      socket.on("message", (msg) => {
        publisher.publish(MESSAGE_CHANNEL, msg.toString());

        subscriber.on("message", (MESSAGE_CHANNEL, msg) => {
          if (msg !== this._prev_message) {
            const message: MESSAGE = JSON.parse(msg);

            this._ManageMessageEvent({ socketId, socket, message });
            this._prev_message = msg;
          }
        });
      });

      socket.on("close", () => {
        this._users.delete(socketId);
      });
    });
    wss.on("close", () => {
      this._users.clear();
    });
  }

  private _ManageMessageEvent({
    socketId,
    message,
    socket,
  }: {
    socketId: number;
    message: MESSAGE;
    socket: WebSocket;
  }): void {
    if (message.type === "JOIN" && message.payload.roomId) {
      this._users.set(socketId, { socket, roomId: message.payload.roomId });
      const newUserAnnouncement: MESSAGE = {
        type: "INFO",
        payload: {
          roomId: message.payload.roomId,
          announcement: `New User Joined Room ${message.payload.roomId}`,
        },
        timeStamp: new Date(),
      };

      this._users.forEach((user) => {
        user.socket.send(JSON.stringify(newUserAnnouncement));
      });
    }

    if (message.type === "MESSAGE" && message.payload.roomId) {
      this._users.forEach((user) => {
        if (user.roomId === message.payload.roomId) {
          // console.log(message);
          user.socket.send(JSON.stringify(message));
        }
      });
    }

    if (message.type === "SPACE") {
    }
  }

  get WebSocketServer() {
    return this._wss;
  }
}
