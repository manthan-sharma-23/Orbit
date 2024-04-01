import { atom } from "recoil";
import { THREAD_SCHEMA } from "typings";

export const threadAtom = atom({
  key: "thread/info/atom",
  default: {} as THREAD_SCHEMA,
});
