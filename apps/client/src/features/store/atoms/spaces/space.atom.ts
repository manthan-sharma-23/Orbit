import { atom } from "recoil";
import { SPACE_SCHEMA } from "typings";

export const spaceDetailsAtom = atom({
  key: "space/key/schema/mapped",
  default: {} as SPACE_SCHEMA,
});
