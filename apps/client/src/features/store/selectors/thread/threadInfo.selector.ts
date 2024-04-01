import { selector } from "recoil";
import { threadAtom } from "../../atoms/thread/thread.atom";

export const threadBaseInfoSelector = selector({
  key: "thread/base/info/selector",
  get: ({ get }) => {
    const thread = get(threadAtom);

    return {
      id: thread.id,
      name: thread.name,
      type: thread.type,
      teamId: thread.teamId,
    };
  },
});
