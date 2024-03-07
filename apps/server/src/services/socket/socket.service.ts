import { WebSocketServer } from "ws";
import http from "http";
import { MESSAGE, MESSAGE_TYPE, TEXT } from "typings";
import RedisClient from "../redis/redis.service";
import { REDIS_PORT } from "../../utils/constants/config";
import { SocketUserMap } from "../../utils/types";

const publisher = new RedisClient(REDIS_PORT);
const subscriber = new RedisClient(REDIS_PORT);
const channel = "MESSAGE";

subscriber.subscriber(channel);

export default class SocketService {
  private _wss: WebSocketServer;
  private _counter = 0;
  public _users: Map<number, SocketUserMap> = new Map();
  private prev_message: string = "";

  constructor(server: http.Server) {
    this._wss = new WebSocketServer({ server });
  }

  private _listenSocketEvents(wss: WebSocketServer): void {
    wss.on("connection", (socket) => {
      const socketId = this._counter++;

      socket.on("message", async (msg) => {
        publisher.publish(channel, msg.toString());
      });

      subscriber.listenMessageEvent((msg) => {
        if (this.prev_message !== JSON.stringify(msg)) {
          socket.send(JSON.stringify(msg));
        }
      });

      socket.onclose = () => {
        console.log("Server websocket closed");
        this._users.delete(socketId);
      };
    });
  }

  public addUser({
    socketId,
    socketInfo,
  }: {
    socketId: number;
    socketInfo: SocketUserMap;
  }): Map<number, SocketUserMap> {
    this._users.set(socketId, socketInfo);
    return this._users;
  }

  get listenWebSocketServerEvents() {
    return this._listenSocketEvents;
  }

  get userCount() {
    return this._counter;
  }

  get wss() {
    return this._wss;
  }

  get users() {
    return this._users;
  }
}
