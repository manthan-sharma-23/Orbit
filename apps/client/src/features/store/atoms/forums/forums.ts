import { atom } from "recoil";
import { FORUM } from "typings";

export const ForumsAtom = atom({
  key: "forums/atom",
  default: [] as FORUM[],
});
