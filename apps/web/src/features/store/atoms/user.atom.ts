import { atom } from "recoil";
import { USER } from "typings";

interface userState {
  isLoading: boolean;
  user: USER | null;
}

const initialState: userState = {
  isLoading: false,
  user: null,
};

export const userAtom = atom({
  key: "user/atom",
  default: initialState,
});
