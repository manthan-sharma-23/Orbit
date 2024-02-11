import { userState } from "../atoms/user.atom";
import { selector } from "recoil";

export const userNameSelector = selector({
  key: "user/name/selector",
  get: ({ get }) => {
    const user = get(userState);

    return user.user?.name;
  },
});
