import { atom } from "recoil";

const initialState: { id: string | null } = { id: null };

export const selectedSpaceAtom = atom({
  key: "selected/space/atom",
  default: initialState,
});
