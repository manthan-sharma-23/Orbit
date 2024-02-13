import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userSelector } from "../features/store/selectors/user.selector";

const ChatPage = () => {
  const [large, setLarge] = useState(true);
  const username = useRecoilValue(userSelector);
  return (
    <div className="h-full w-full p-4 pl-0 flex gap-3 relative  transition-all duration-500">
      <div
        className={`w-${large ? "full" : "[70%]"} h-full bg-white transition-all duration-500 rounded-3xl relative flex flex-col p-3`}
      >
        <div className="flex justify-end items-center transition-all duration-500">
          <p
            className="border-black border-2 p-2 cursor-pointer rounded-lg"
            onClick={() => setLarge((v) => !v)}
          >
            {username}
          </p>
        </div>
      </div>
      <div
        className={`transition-all duration-500 relative  flex w-${large ? "0" : "[30%]"} gap-3 h-full bg-transparent flex-col  justify-start items-center`}
      >
        <div className="bg-white h-[55%] w-full rounded-3xl"></div>
        <div className="bg-green-100/90 h-[45%] w-full rounded-3xl"></div>
      </div>
    </div>
  );
};

export default ChatPage;
