import { selector } from "recoil";
import { userAtom } from "../atoms/user.atom";

export const userSelector = selector({
  key: "user/name/selector",
  get: ({ get }) => {
    const username = get(userAtom);

    return username.user?.name;
  },
});
