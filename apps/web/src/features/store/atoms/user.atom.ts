import { atom } from "recoil";
import { USER } from "typings";

interface userState {
  user: USER | null;
  isLoading: boolean;
}

const initialState: userState = {
  user: null,
  isLoading: false,
};

export const userState = atom({
  key: "user/atom",
  default: initialState,
});
