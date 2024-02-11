import { atom } from "recoil";

export const counterState = atom({
  key: "counter",
  default: {
    value: 0,
    isLoading: false,
  },
});
