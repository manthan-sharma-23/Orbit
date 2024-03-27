import { atom } from "recoil";
import { USER } from "typings";

export const UsersAtom = atom({
  key: "users/key/atom",
  default: [] as USER[],
});
