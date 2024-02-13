import { Outlet } from "react-router-dom";
import ChatInfo from "../container/ChatInfo";
import RequestSection from "../container/RequestSection";

const DMLayout = () => {
  return (
    <div className="h-full w-full p-3">
      <div className="h-full w-full  rounded-xl overflow-hidden flex">
        <div className="w-[25%] h-full bg-black/20">
          <div className="text-4xl w-full h-[10%] flex justify-start items-center px-3 font-sans text-rose-400 font-semibold tracking-wide">
            Direct Messages
          </div>
          <div className="w-full h-[5%] px-2">
            <input
              className="h-full w-full bg-white/10 focus:outline-none px-2 text-white/80 rounded-lg"
              placeholder="Search with username "
            />
          </div>
          <div className="w-full h-[85%] ">
            <ChatInfo />
          </div>
        </div>
        <div className="w-[75%] h-full  flex">
          <div className="w-[70%] h-full bg-white">
            <Outlet />
          </div>
          <div className="w-[30%] h-full bg-white/10">
            <RequestSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DMLayout;
