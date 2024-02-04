import { Outlet } from "react-router-dom";

const Chat = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center border-2 border-black">
      Chat
      <Outlet />
    </div>
  );
};

export default Chat;
