import { atom } from "recoil";
import { TEAM } from "typings";

const initialState: { teams: TEAM[]; loading: boolean } = {
  loading: false,
  teams: [],
};

export const spaceThreadsAtom = atom({
  key: "space/threads/atom",
  default: initialState,
});
