import { selector } from "recoil";
import { counterState } from "../atoms/counter.state";

export const counterValue = selector({
  key: "CounterValue",
  get: ({ get }) => {
    const counter = get(counterState);

    return counter.value;
  },
});
