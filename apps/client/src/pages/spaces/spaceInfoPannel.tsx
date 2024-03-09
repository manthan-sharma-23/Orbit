import Loading from "@/components/ui/Loading";
import { useGetSpaceTeamAndThreads } from "@/features/hooks/spaces/useGetSpaceTeamAndThreads";
import { useRecoilValue } from "recoil";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { TEAM } from "typings";
import {
  ChevronDown,
  ChevronRight,
  Circle,
  Hash,
  Megaphone,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const SpaceInfoPannel = () => {
  const { loading, teams } = useGetSpaceTeamAndThreads();

  console.log("teams", teams);

  if (loading) {
    return (
      <div className="h-full w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="h-full w-full p-2">
      <div className="mt-2 pl-2">
        <p className="text-xl font-medium">Teams Threads</p>
        <Separator className="bg-black/40 my-2" />
        <div className="flex flex-col justify-center items-start w-full h-auto gap-0 mt-5 mr-2 ">
          {teams &&
            teams.map((team, index) => (
              <CollapsibleThread team={team} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

const CollapsibleThread = ({ team }: { team: TEAM }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div
      className={` w-full flex flex-col rounded-md ${!collapsed && "bg-[#e9e9e9]"} py-2 hover:bg-black/10`}
    >
      <div
        onClick={() => setCollapsed((e) => !e)}
        className="flex justify-start items-center  h-[2rem] w-full pl-4  transition-all cursor-pointer"
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4 text-black/60" />
        ) : (
          <ChevronDown className="h-4 w-4 text-black" />
        )}
        <p
          className={` ${!collapsed ? "text-black" : "text-black/60"} font-medium ml-1 `}
        >
          {team.name}
        </p>
      </div>
      {!collapsed && (
        <div className={`flex flex-col ml-[2.5rem] gap-2 transition-all `}>
          {team.threads.map((thread, index) => (
            <div
              className={`flex justify-start items-center ${index === 0 && "mt-1"}`}
              key={index}
            >
              {thread.type === "chat" ? (
                <Hash
                  className={`h-5 w-5 text-black/60 p-0  mr-2 flex items-center justify-center`}
                />
              ) : (
                <Megaphone
                  className={`h-5 w-5 text-black/60 p-0  mr-2 flex items-center justify-center`}
                />
              )}
              <p
                className={`cursor-pointer flex justify-center items-center text-black/60 `}
              >
                {thread.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpaceInfoPannel;
