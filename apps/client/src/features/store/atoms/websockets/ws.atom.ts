import { atom } from "recoil";

export const WebSocketAtom = atom({
  key: "ws/atom/key",
  default: null as WebSocket | null,
});
