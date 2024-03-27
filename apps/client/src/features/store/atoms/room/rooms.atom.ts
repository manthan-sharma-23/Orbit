import { atom } from "recoil";
import { ROOM } from "typings";

export const RoomsAtom = atom({
  key: "rooms/key/atom",
  default: [] as ROOM[],
});
