import { atom } from "recoil";
import { USER_SPACE_SCHEMA } from "typings";

const initialState: { loading: boolean; userSpace: USER_SPACE_SCHEMA[] } = {
  loading: false,
  userSpace: [],
};

export const SpacesInfoAtom = atom({
  key: "space/atom",
  default: initialState,
});
