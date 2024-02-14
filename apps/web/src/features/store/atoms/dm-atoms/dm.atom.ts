import { atom } from "recoil";
import { FRIEND, TEXT } from "typings";

interface initialState {
  friend: FRIEND | null;
  MESSAGES?: TEXT[];
}

const initialState: initialState = {
  friend: {},
  MESSAGES: [],
};

export const dmAtom = atom({
  key: "chat/atom",
  default: initialState,
});
