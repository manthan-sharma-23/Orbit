import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { sideIcons } from "@/lib/static/global/options/side.nav";
import { SpacesSideIcons } from "@/lib/static/spaces/sideBar";
import { Link, useLocation } from "react-router-dom";

const SpaceSideBar = () => {
  const { pathname } = useLocation();

  return (
    <div className="h-full w-full flex flex-col justify-start items-center">
      <div className="my-10 w-full px-2 gap-2 flex flex-col text-white/70">
        {SpacesSideIcons.map((ico) => {
          return (
            <Link
              to={`/home/spaces/${ico.href}`}
              className={`flex justify-start h-8 rounded-lg items-center cursor-pointer border-0 w-full gap-2 pl-5 hover:bg-[#1C1C1C] hover:text-white/90 ${pathname.startsWith(`/home/spaces/${ico.href}`) && "bg-[#1C1C1C] text-white/90"}`}
            >
              <ico.icon className="text-[1rem]" />
              <p className="font-sans">{ico.name}</p>
            </Link>
          );
        })}
      </div>
      <div className="flex justify-start items-center w-[80%] mb-3 h-auto pr-5">
        <div className="mr-2 h-auto border-0">
          <p className="w-auto font-mono text-xl text-white/80">TEAMS</p>
        </div>
        <Separator className="bg-white/50 w-[80%]" />
      </div>
      <div className="w-full h-auto flex flex-col gap-1 border-0 px-10">
        <ScrollArea className=""></ScrollArea>
      </div>
    </div>
  );
};

export default SpaceSideBar;
