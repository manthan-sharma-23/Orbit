import { atom } from "recoil";
import { FRIEND } from "typings";

const initialState: FRIEND[] = [];

export const friendsAtom = atom({
  key: "friends/atom",
  default: initialState,
});
