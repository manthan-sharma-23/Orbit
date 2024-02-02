import * as Md from "react-icons/md";
import * as Io from "react-icons/io";
import * as Io5 from "react-icons/io5";
import * as Ci from "react-icons/ci";

const Sidebar = () => {
  return (
    <div className="h-screen w-[5vw] bg-black relative z-20 flex flex-col justify-center items-center text-white text-2xl font-bold">
      <div className="h-[50%] w-full flex justify-center items-center flex-col gap-8">
        <Md.MdHome className="cursor-pointer" />
        <Ci.CiCalendar className="cursor-pointer" />
        <Md.MdOutlineGroups className="cursor-pointer" />
        <Io5.IoChatbubbleOutline className="cursor-pointer" />
        <Md.MdAdd className="cursor-pointer" />
      </div>
      <div className="h-[40%] w-full flex justify-end flex-col items-center gap-8">
        <Io.IoMdSettings className="cursor-pointer" />
        <Ci.CiLogout className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Sidebar;
