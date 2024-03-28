import { atom } from "recoil";
import { FRIEND_REQUEST } from "typings";

export const userFriendsAtom = atom({
  key: "user/friend/atom",
  default: [] as FRIEND_REQUEST[],
});
