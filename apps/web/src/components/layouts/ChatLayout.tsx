import React from "react";
import { Outlet } from "react-router-dom";

function ChatLayout() {
  return (
    <div className="h-full w-full">
      <Outlet />
    </div>
  );
}

export default ChatLayout;
