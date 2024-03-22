import { atom } from "recoil";
import { THREAD_SCHEMA } from "typings";

const initial: THREAD_SCHEMA = {
  id: "",
  name: "",
  type: "",
  teamId: "",
  messages: [],
};

export const threadAtom = atom({
  key: "thread/info/atom",
  default: initial,
});
