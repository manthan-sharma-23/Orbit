import { Separator } from "@/components/ui/separator";
import { forumsList } from "@/lib/static/global/forum/forum.list";
import { sideIcons } from "@/lib/static/global/options/side.nav";
import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const Global = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      pathname === "/home/globe" ||
      pathname === "/home/globe/" ||
      pathname === "/home/globe?"
    ) {
      navigate("/home/globe/forum");
    }
  }, []);
  return (
    <div className="h-full w-full flex flex-col bg-[#0F0F0F] text-white">
      <div className="flex h-[8vh] justify-start px-3 items-center bg-transparent">
        <p className="font-mono font-normal text-xl  tracking-tight bg-white/80 text-black ml-4 px-3 py-1">
          ORBIT GLOBAL
        </p>
      </div>
      <Separator className="bg-white/10" />
      <div className=" h-[92vh] w-full text-white flex">
        <div className="w-[25%] h-full">
          <SideBar />
        </div>
        <div className="w-[75%] h-full border-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const SideBar = () => {
  const { pathname } = useLocation();

  return (
    <div className="h-full w-full flex flex-col justify-start items-center gap-4">
      <div className="my-10 w-full px-2 gap-1 flex flex-col text-white/70">
        {sideIcons.map((ico) => {
          return (
            <Link
              to={`/home/globe/${ico.href}`}
              className={`flex justify-start h-8 rounded-lg items-center cursor-pointer border-0 w-full gap-2 pl-5 hover:bg-[#1C1C1C] hover:text-white/90 ${pathname.startsWith(`/home/globe/${ico.href}`) && "bg-[#1C1C1C] text-white/90"}`}
            >
              <ico.icon className="p-[2.5px]" />
              <p className="font-sans">{ico.name}</p>
            </Link>
          );
        })}
      </div>
      <div className="flex justify-start items-center w-[80%] h-auto pr-5">
        <div className="mr-2 h-auto border-0">
          <p className="w-auto font-mono text-xl text-white/80">FORUMS</p>
        </div>
        <Separator className="bg-white/50 w-[80%]" />
      </div>
      <div className="w-full h-auto flex flex-col gap-1 border-0 px-10">
        {forumsList.map((forum) => {
          return (
            <Link
              to={"/home/globe/forum/" + forum.href}
              className={`pl-4 flex text-white/60 justify-start h-8 rounded-lg items-center cursor-pointer border-0 w-full gap-2 hover:bg-[#1C1C1C] hover:text-white/90 ${pathname.startsWith(`/home/globe/forum/${forum.href}`) && "bg-[#1C1C1C] text-white/90"}`}
            >
              <div
                className={`h-2 w-2 rotate-45`}
                style={{ backgroundColor: forum.color }}
              ></div>
              <p className="font-sans">{forum.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Global;
