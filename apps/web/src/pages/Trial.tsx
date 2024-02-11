import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { counterState } from "../features/store/atoms/counter.state";
import { counterValue } from "../features/store/selectors/counter.selector";

function Trial() {
  const counter = useRecoilValue(counterValue);
  const setCounter = useSetRecoilState(counterState);

  const change = (action: "increement" | "decreement") => {
    if (action === "increement") {
      setCounter((c) => ({ ...c, value: c.value + 1 }));
    } else {
      setCounter((c) => ({ ...c, value: c.value - 1 }));
    }
  };
  return (
    <div className="h-full w-full flex justify-center items-center text-5xl font-bold font-mono gap-[10rem]">
      <button
        onClick={() => change("increement")}
        className="rounded-full bg-gray-300 flex justify-center items-center h-[5rem] w-[5rem] p-2"
      >
        +
      </button>
      {counter}
      <button
        onClick={() => change("decreement")}
        className="rounded-full bg-gray-300 flex justify-center items-center h-[5rem] w-[5rem] p-2"
      >
        -
      </button>
    </div>
  );
}

export default Trial;
