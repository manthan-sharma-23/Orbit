import { Link } from "react-router-dom";
import "../../styles/scroll.css";
import * as Ri from "react-icons/ri";
import { BsPerson } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";

const ChatProfilePannel = () => {
  const [isAddOn, setAddOn] = useState<boolean>(false);

  return (
    <div className="h-full w-full bg-[#F0F0F0] flex flex-col justify-start items-center">
      <div className="w-full h-[10vh] flex justify-start items-center font-sans font-bold text-4xl px-5 ">
        <p className="w-[80%] h-full flex justify-start items-center">ChatX</p>
      </div>
      <div className="h-[90vh] w-full flex justify-center items-center">
        <div className="h-full w-1/5 flex justify-start items-center">
          <div className="bg-white h-[80%] w-[80px] rounded-r-xl shadow-lg flex flex-col justify-start items-center text-[1.5rem] text-gray-600">
            <Link to={"/"} className="my-6">
              <BsPerson />
            </Link>
            <Link to={"/"} className="my-6">
              <Ri.RiGroupLine />
            </Link>
            <Link to={"/"} className="my-6">
              <Ri.RiBroadcastLine />
            </Link>
            <div
              className="my-3 cursor-pointer relative h-[4rem] w-full flex justify-center items-center"
              onMouseEnter={() => setAddOn(true)}
              onMouseLeave={() => setAddOn(false)}
            >
              <FiPlus />
              {isAddOn && (
                <div
                  onMouseEnter={() => setAddOn(true)}
                  onMouseLeave={() => setAddOn(false)}
                  className="h-[12rem] w-[12rem] border-2 border-yellow-300 shadow-lg bg-white absolute z-30 left-[70px] top-[-5px] rounded-lg"
                >
                  Hello
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="h-full w-4/5 relative bg-transparent overflow-y-scroll scrollw pl-2 pr-[2px]">
          <ProfileCard />
        </div>
      </div>
    </div>
  );
};

const ProfileCard = () => {
  return (
    <>
      <div className="bg-white h-[8.5vh] w-full rounded-lg p-2 flex items-center my-2 cursor-pointer shadow-lg">
        <div className="h-full w-[20%] flex justify-center items-center rounded-full overflow-hidden">
          <img
            src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.1448711260.1706918400&semt=ais"
            className="h-[60px] w-[60px] rounded-full"
          />
        </div>
        <div className="h-full w-[90%] flex justify-center items-center">
          <div className="h-full w-[90%] flex flex-col justify-center items-start pl-3">
            <div className="font-mono font-[800]">Dakota Johnson</div>
            <div className="font">
              <p>Hey There Have you Reqached ??</p>
            </div>
          </div>
          <div className="h-full w-[10%] flex justify-center items-center">
            <span className="h-[25px] font-roboto w-[25px] flex justify-center items-center bg-gray-500 rounded-full text-white">
              1
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white h-[8.5vh] w-full rounded-lg p-2 flex items-center my-2 cursor-pointer shadow-lg">
        <div className="h-full w-[20%] flex justify-center items-center rounded-full overflow-hidden">
          <img
            src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.1448711260.1706918400&semt=ais"
            className="h-[60px] w-[60px] rounded-full"
          />
        </div>
        <div className="h-full w-[90%] flex justify-center items-center">
          <div className="h-full w-[90%] flex flex-col justify-center items-start pl-3">
            <div className="font-mono font-[800]">Dakota Johnson</div>
            <div className="font">
              <p>Hey There Have you Reqached ??</p>
            </div>
          </div>
          <div className="h-full w-[10%] flex justify-center items-center">
            <span className="h-[25px] font-roboto w-[25px] flex justify-center items-center bg-blue-500 rounded-full text-white">
              1
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatProfilePannel;
