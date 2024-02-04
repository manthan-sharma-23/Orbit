import "../../styles/scroll.css";
import { MdOutlineSearch } from "react-icons/md";

const ChatProfilePannel = () => {
  return (
    <div className="h-full w-full bg-[#F0F0F0] flex flex-col justify-start items-center  border-r-4 ">
      <div className="w-full h-[10vh] flex justify-start items-center font-sans font-bold text-4xl px-5">
        <p className="w-[80%] h-full flex justify-start items-center">Chat</p>
        <span className="w-[20%] h-[45px] rounded-lg px-[3px] flex justify-end items-center cursor-pointer text-[1.8rem] text-gray-700 bg-white">
          <MdOutlineSearch />
        </span>
      </div>
      <div className="h-[90vh] w-full relative bg-transparent overflow-y-scroll scrollw pl-2 pr-[2px]">
        <ProfileCard />
      </div>
    </div>
  );
};

const ProfileCard = () => {
  return (
    <>
      <div className="bg-white h-[8.5vh] w-full rounded-lg p-2 flex items-center my-2 cursor-pointer shadow-md">
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
    </>
  );
};

export default ChatProfilePannel;
