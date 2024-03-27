import http from "http";
import { MESSAGE } from "typings";
import { WebSocket, WebSocketServer } from "ws";
import { SocketUserMap } from "../../utils/types";

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
        if (msg.toString() !== this._prev_message) {
          const message: MESSAGE = JSON.parse(msg.toString());
          this._ManageMessageEvent({ socketId, socket, message });
          this._prev_message = msg.toString();
        }
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
          user.socket.send(JSON.stringify(message));
        }
      });
    }
  }

  get WebSocketServer() {
    return this._wss;
  }
}
