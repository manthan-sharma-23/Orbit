import { atom } from "recoil";
import { TEAM } from "typings";

export const teamAtom = atom({
  key: "team/info/atom",
  default: null as TEAM | null,
});
