import { WebSocketServer } from "ws";
import http from "http";
import { MESSAGE, MESSAGE_TYPE, TEXT } from "typings";

export default class SocketService {
  private _wss: WebSocketServer;
  private _counter = 0;
  private _users: { [key: string]: { roomId: string; socket: any } } = {};

  constructor(server: http.Server) {
    this._wss = new WebSocketServer({ server });
  }

  private _listenSocketEvents(wss: WebSocketServer) {
    wss.on("connection", (socket) => {
      const socketId = this._counter++;

      socket.on("message", async (msg) => {
        const message: MESSAGE = JSON.parse(msg.toString());

        if (message.type === MESSAGE_TYPE.join && message.payload.roomId) {
          this._joinRoom(socketId, message.payload.roomId, socket);
        }

        if (
          message.type === MESSAGE_TYPE.message &&
          message.payload.roomId &&
          message.payload.message
        ) {
          const roomId = this._users[socketId]?.roomId;
          const text = message.payload.message;

          this._sendMessageToRoom(roomId!, text);
        }
      });

      socket.onclose = () => {
        console.log("Sevrer websocket closed");

        delete this.users[socketId];
      };
    });
  }

  private _joinRoom(socketId: number, roomId: string, socket: any) {
    this.users[socketId] = {
      roomId,
      socket,
    };
    socket.send(JSON.stringify({ message: "INFO", room: roomId }));
  }

  private _sendMessageToRoom(roomId: string, text: TEXT) {
    Object.keys(this._users).forEach(async (socketId) => {
      if (this._users[socketId]?.roomId === roomId) {
        this._users[socketId]?.socket.send(
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
