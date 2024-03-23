import { selector } from "recoil";
import { userAtom } from "../../atoms/user.atom";

export const UserBaseDetailSelector = selector({
  key: "user/base/detail/selector",
  get: ({ get }) => {
    const user = get(userAtom);

    return {
      email: user.user?.email,
      name: user.user?.name,
      image: user.user?.image,
    };
  },
});
