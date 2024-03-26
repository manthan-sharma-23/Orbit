import { atom } from "recoil";
import { FORUM } from "typings";

export const ForumAtom = atom({
  key: "forum/byId/key/atom",
  default: null as null | FORUM,
});
