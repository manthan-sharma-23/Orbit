import { atom } from "recoil";
import { ROOM } from "typings";

const initialState: ROOM = {
  id: "",
  users: [],
  messages: [],
  createdAt: new Date(),
};

export const RoomDetailsAtom = atom({
  key: "/room/details/atom",
  default: initialState,
});
