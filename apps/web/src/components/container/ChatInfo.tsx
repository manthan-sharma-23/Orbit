import "../../styles/scroll.css";
import React from "react";

const ChatInfo = () => {
  return (
    <div className="relative h-[90vh] w-full px-3 scrollw overflow-y-scroll py-2 ">
      <FriendBox />
      <FriendBox />
      <FriendBox />
      <FriendBox />
      <FriendBox />
      <FriendBox />
      <FriendBox />
      <FriendBox />
      <FriendBox />
      <FriendBox />
      <FriendBox />
      <FriendBox />
      <FriendBox />
    </div>
  );
};

const FriendBox = () => {
  return (
    <div className="h-[10vh] w-full text-white/85  flex relative my-2 hover:bg-white/10 cursor-pointer rounded-lg hover:text-white transition-all">
      <div className="h-full w-[20%] flex justify-center items-center">
        <img
          className="overflow-hidden h-[5rem] w-[5rem] rounded-full p-2"
          src="https://openseauserdata.com/files/7c51390154b0e7dfec52c1e4e7b05299.png"
        />
      </div>
      <div className="h-full w-[80%]  py-2 px-3 flex flex-col items-start justify-center">
        <p className="w-full h-auto text-lg font-semibold font-sans">
          Jane Iyyer
        </p>
        <div className="flex w-full justify-between items-center">
          <p className="font-[100]">Hey babe did you reached ?</p>
          <p className="font-bold">11:59 pm</p>
        </div>
      </div>
    </div>
  );
};

export default ChatInfo;
