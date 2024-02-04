import { Outlet } from "react-router-dom";
import ChatProfilePannel from "../containers/ChatProfilePannel";

const ChatLayout = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="h-screen w-1/4">
        <ChatProfilePannel />
      </div>
      <div className="h-screen w-3/4 bg-[#F0F0F0]">
        <SearchBar />
        <div className="h-[90vh] w-full px-2 pb-2 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const SearchBar = () => {
  return (
    <div className="h-[10vh] w-full flex justify-center items-center ">
      <div className="w-[85%] bg-white h-12 rounded-3xl shadow-sm"></div>
    </div>
  );
};

export default ChatLayout;
