import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { spaceDetailsAtom } from "@/features/store/atoms/spaces/space.atom";
import { sideIcons } from "@/lib/static/global/options/side.nav";
import { SpacesSideIcons } from "@/lib/static/spaces/sideBar";
import { Link, useLocation, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

const SpaceSideBar = () => {
  const { pathname } = useLocation();
  const { spaceId } = useParams();
  const space = useRecoilValue(spaceDetailsAtom);

  return (
    <div className="h-full w-full flex flex-col justify-start items-center">
      <div className="my-7 w-full px-2 gap-2 flex flex-col text-white/70">
        {SpacesSideIcons.map((ico) => {
          return (
            <Link
              to={`/home/spaces/${spaceId}/${ico.href}`}
              className={`flex justify-start h-8 rounded-lg items-center cursor-pointer border-0 w-full gap-2 pl-5 hover:bg-[#1C1C1C] hover:text-white/90 ${pathname.startsWith(`/home/spaces/${spaceId}/${ico.href}`) && "bg-[#1C1C1C] text-white/90"}`}
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
      <div className="w-full h-[60%] flex flex-col gap-1 border-0 px-10 py-2">
        <ScrollArea className="h-full w-full">
          {space.teams &&
            space.teams.map((team) => (
              <Link
                to={`/home/spaces/${spaceId}/team/${team.id}`}
                className={`flex justify-start h-8 rounded-lg items-center cursor-pointer border-0 w-full gap-2 pl-5 hover:bg-[#1C1C1C] hover:text-white/90 ${pathname.startsWith(`/home/spaces/${spaceId}/team/${team.id}`) && "bg-[#1C1C1C] text-white/90"}`}
              >
                <p className="font-sans">{team.name}</p>
              </Link>
            ))}
        </ScrollArea>
      </div>
    </div>
  );
};

export default SpaceSideBar;
