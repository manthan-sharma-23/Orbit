import React from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";
import { IoCall } from "react-icons/io5";
import { LuFolderClosed } from "react-icons/lu";

const DMPage = () => {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="h-[10%] border-b-2 border-black/50 flex">
        <div className="h-full w-[15%] flex justify-start items-center px-5">
          <img
            className="h-[4.5rem] w-[4.5rem] rounded-full"
            src="https://openseauserdata.com/files/7c51390154b0e7dfec52c1e4e7b05299.png"
          />
        </div>
        <div className="h-full w-[65%] flex justify-start items-center text-3xl font-sans font-bold">
          Jane Iyyer
        </div>
        <div className="h-full w-[25%] flex justify-end items-center gap-6 px-6 text-[1.5rem]">
          <BsInfoCircleFill className="cursor-pointer" />
          <IoCall className="cursor-pointer" />
          <LuFolderClosed className="cursor-pointer" />
        </div>
      </div>
      <div className="h-[90%] text-black flex flex-col p-3">
        <div className="h-[85%] w-full "></div>
        <div className=" h-[15%] w-full flex justify-center items-center gap-2">
          <p className="h-[5vh] w-[5vh] cursor-pointer flex items-center justify-center text-xl bg-gray-50 border-2 border-gray-300 rounded-full ">
            <GrAttachment className=" hover:scale-[1.1] transition-all" />
          </p>
          <input
            placeholder="Enter you message "
            className="rounded-2xl px-2 focus:outline-none w-[60%] h-[5vh] border-gray-300 border-2"
          />
          <button className="bg-black text-white h-[2.7rem] rounded-xl font-sans font-medium hover:bg-white hover:text-black hover:border-black hover:border-2 transition-all text-lg w-[5rem] justify-center items-center flex">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default DMPage;
