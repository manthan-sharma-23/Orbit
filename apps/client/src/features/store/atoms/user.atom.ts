import { atom } from "recoil";
import { USER } from "typings";

interface userState {
  user: USER | null;
}

const initialState: userState = {
  user: null,
};

export const userAtom = atom({
  key: "user/atom",
  default: initialState,
});
