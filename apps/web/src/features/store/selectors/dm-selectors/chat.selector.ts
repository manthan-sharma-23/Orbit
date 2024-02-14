import { selector } from "recoil";
import { dmAtom } from "../../atoms/dm-atoms/dm.atom";

export const chatSelector = selector({
  key: "chat/selector",
  get: ({ get }) => {
    const chatAtom = get(dmAtom);
    return { chat: chatAtom.MESSAGES };
  },
});
