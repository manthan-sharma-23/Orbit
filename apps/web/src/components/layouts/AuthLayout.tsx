import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="bg-[#202022] h-screen w-screen flex justify-center items-center">
      <div className="min-h-[30vh] border-white w-[35vw]">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
