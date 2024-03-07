import { atom } from "recoil";
import { USER } from "typings";

interface userState {
  user: USER | null;
  loading: boolean;
}

const initialState: userState = {
  user: null,
  loading: false,
};

export const userAtom = atom({
  key: "user/atom",
  default: initialState,
});
