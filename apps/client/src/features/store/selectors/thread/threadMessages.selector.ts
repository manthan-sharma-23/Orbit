import { selector } from "recoil";
import { threadAtom } from "../../atoms/thread.tsx/thread.atom";

export const threadMessagesSelector = selector({
  key: "thread/messages/get/selector",
  get: ({ get }) => {
    const thread = get(threadAtom);

    return thread.messages;
  },
});
