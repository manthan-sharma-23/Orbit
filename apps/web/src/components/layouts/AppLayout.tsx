import { Outlet } from "react-router-dom";
import * as GoIcons from "react-icons/go";
import * as Io5Icons from "react-icons/io5";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import * as PiIcons from "react-icons/pi";
import "../../styles/icons.css";
import icon from "../../assets/teams.jpg";

const links = {
  home: "/",
  chat: "/chat",
  meet: "/meet",
  settings: "/settings",
  calendar: "/calendar",
};

const AppLayout = () => {
  const params = window.location.pathname;

  console.log(params);
  return (
    <div className="text-black h-screen w-screen overflow-hidden flex justify-center bg-white items-center">
      <div className="w-[5vw] h-full flex flex-col justify-center items-start bg-yellow-500 p-2">
        <div className="relative z-4 w-full h-[20%] flex justify-start items-center flex-col pt-2">
          <div className="cursor-pointer h-[4.5rem] rounded-md w-[4rem] bg-white/25 flex  justify-center  items-start">
            <div className="h-[4.3rem] rounded-md w-[4rem] bg-white/65 flex  justify-center  items-start">
              <div className="h-[4rem] w-[4rem] border-2 border-white rounded-md overflow-hidden flex justify-center items-center">
                <img
                  src={icon}
                  className="h-[4.5rem] w-[4.5rem] object-cover"
                />
              </div>
            </div>
          </div>
          <p className="cursor-pointer text-3xl text-white mt-2">
            <MdOutlineKeyboardArrowDown />
          </p>
        </div>
        <div className="w-full h-[60%] text-white flex justify-start items-center pt-3 flex-col gap-5">
          <Link to={links.home} className="link_icons">
            {params === links.home ? (
              <GoIcons.GoHomeFill />
            ) : (
              <GoIcons.GoHome />
            )}
          </Link>
          <Link to={links.chat} className="link_icons">
            {params === links.chat ? (
              <Io5Icons.IoChatbubble />
            ) : (
              <Io5Icons.IoChatbubbleOutline />
            )}
          </Link>
          <Link to={links.meet} className="link_icons">
            {params === links.meet ? (
              <PiIcons.PiVideoCameraFill />
            ) : (
              <PiIcons.PiVideoCameraLight />
            )}
          </Link>
          <Link to={links.calendar} className="link_icons">
            {params === links.calendar ? (
              <PiIcons.PiCalendarCheckFill />
            ) : (
              <PiIcons.PiCalendarCheckDuotone />
            )}
          </Link>
        </div>
        <div className="w-full h-[40%]  flex flex-col justify-end items-center pb-2 gap-5">
          <Link to={links.settings} className="link_icons ">
            {params === links.settings ? (
              <Io5Icons.IoSettings />
            ) : (
              <Io5Icons.IoSettingsOutline />
            )}
          </Link>
          <div className="relative z-10 h-[3.8rem] w-[3.8rem] border-[1px] font-sans font-extrabold text-white text-4xl tracking-wider border-white rounded-md bg-green-500  overflow-hidden flex justify-center items-center">
            M
          </div>
        </div>
      </div>
      <div className="w-[95vw] h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
