import * as Md from "react-icons/md";
import * as Io from "react-icons/io";
import * as Io5 from "react-icons/io5";
import * as Ci from "react-icons/ci";
import { Link, Outlet } from "react-router-dom";
import React from "react";

const BaseLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen flex justify-start items-center text-black">
      <div className="h-screen w-[5vw] bg-black relative z-20 flex flex-col justify-center items-center text-white text-[1.75rem] font-bold">
        <div className="h-[50%] w-full flex justify-center items-center flex-col gap-8">
          <Link to="/">
            <Md.MdHome className="cursor-pointer" />
          </Link>
          <Link to="/">
            <Ci.CiCalendar className="cursor-pointer" />
          </Link>
          <Link to="/">
            <Md.MdOutlineGroups className="cursor-pointer" />
          </Link>
          <Link to="/chat">
            <Io5.IoChatbubbleOutline className="cursor-pointer" />
          </Link>
          <Link to="/">
            <Md.MdAdd className="cursor-pointer" />
          </Link>
        </div>
        <div className="h-[40%] w-full flex justify-end flex-col items-center gap-8">
          <Link to="/">
            <Io.IoMdSettings className="cursor-pointer" />
          </Link>
          <Link to="/">
            <Ci.CiLogout className="cursor-pointer" />
          </Link>
        </div>
      </div>
      {children}
      <Outlet />
    </div>
  );
};

export default BaseLayout;
