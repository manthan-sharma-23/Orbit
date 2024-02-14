import { Outlet } from "react-router-dom";
import * as GoIcons from "react-icons/go";
import * as Io5Icons from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import * as PiIcons from "react-icons/pi";
import "../../styles/icons.css";
import { SlGlobe } from "react-icons/sl";
// import icon from "../../assets/teams.jpg";
import { useRecoilValue } from "recoil";
import { userSelector } from "../../features/store/selectors/user.selector";
import { profileColor } from "../../utils/constants/color.code";

const links = {
  home: "/",
  meet: "/meet",
  settings: "/settings",
  calendar: "/calendar",
  global: "/global",
  dms: "/dms",
};

const AppLayout = () => {
  const params = window.location.pathname;
  const { username } = useRecoilValue(userSelector);
  const hexCode = profileColor();

  return (
    <div className="text-black h-screen w-screen overflow-hidden flex justify-center bg-white items-center">
      <div className="w-[5vw] h-full flex flex-col justify-center items-start bg-[#202022] p-2">
        <div className="relative z-4 w-full h-[20%] flex justify-start items-center flex-col pt-2">
          <div className="cursor-pointer h-[4.5rem] rounded-md w-[4rem] bg-white/25 flex  justify-center  items-start">
            <div className="h-[4.3rem] rounded-md w-[4rem] bg-white/65 flex  justify-center  items-start">
              <div className="h-[4rem] w-[4rem] border-2 border-white rounded-md overflow-hidden flex justify-center items-center">
                <img
                  src="https://cdn.vectorstock.com/i/preview-1x/40/31/japanese-ninja-monkey-nft-design-crypto-art-vector-42614031.jpg"
                  className="h-[4.5rem] w-[4.5rem] object-cover"
                />
              </div>
            </div>
          </div>
          <div className="cursor-pointer text-3xl text-white mt-[0px]">
            <MdOutlineKeyboardArrowDown />
          </div>
        </div>
        <div className="w-full h-[60%] text-white flex justify-start items-center pt-3 flex-col gap-5 ">
          <a
            href={links.home}
            className="link_icons flex flex-col justify-evenly items-center"
          >
            <p>
              {params === links.home ? (
                <GoIcons.GoHomeFill />
              ) : (
                <GoIcons.GoHome />
              )}
            </p>
            <p className="text-sm text-gray-300 font-light ">Home</p>
          </a>
          <a href={links.meet} className="link_icons">
            {params === links.meet ? (
              <PiIcons.PiVideoCameraFill />
            ) : (
              <PiIcons.PiVideoCameraLight />
            )}
          </a>
          <a href={links.calendar} className="link_icons">
            {params === links.calendar ? (
              <PiIcons.PiCalendarCheckFill />
            ) : (
              <PiIcons.PiCalendarCheckDuotone />
            )}
          </a>
        </div>
        <div className="  w-full h-[40%]  flex flex-col justify-end items-center pb-2 gap-5">
          <a href={links.dms} className="link_icons ">
            {params === links.dms ? (
              <Io5Icons.IoChatbubbles />
            ) : (
              <Io5Icons.IoChatbubblesOutline />
            )}
          </a>
          <a href={links.global} className="link_icons ">
            <SlGlobe />
          </a>
          <a href={links.settings} className="link_icons ">
            {params === links.settings ? (
              <Io5Icons.IoSettings />
            ) : (
              <Io5Icons.IoSettingsOutline />
            )}
          </a>
          <div
            style={{ backgroundColor: hexCode }}
            className={`cursor-pointer relative z-10 h-[3.8rem]  w-[3.8rem] border-[1px] font-sans font-extrabold text-white text-4xl tracking-wider border-white rounded-md overflow-hidden flex justify-center items-center`}
          >
            {username?.split("")[0] || "#"}
          </div>
        </div>
      </div>
      <div className="w-[95vw] h-full bg-[#202022]">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
