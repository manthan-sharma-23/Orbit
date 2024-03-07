import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface ProtectedRequest extends Request {
  user?: string;
}

export interface UserJwtPayload extends JwtPayload {
  userId?: string;
}

export type SocketUserMap = {
  roomId: string;
  socket: WebSocket;
};
