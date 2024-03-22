import Loading from "@/components/ui/Loading";
import { useGetSpaceTeamAndThreads } from "@/features/hooks/spaces/useGetSpaceTeamAndThreads";
import { useState } from "react";
import { TEAM } from "typings";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bolt,
  ChevronDown,
  ChevronRight,
  Hash,
  Megaphone,
  Search,
  UserPlus,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import CreateThread from "./createThread";
import { useNavigate } from "react-router-dom";

const SpaceInfoPannel = () => {
  const { loading, teams } = useGetSpaceTeamAndThreads();

  if (loading) {
    return (
      <div className="h-full w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="h-full w-full p-2">
      <div>
        <div className="relative w-full h-[2.5rem] mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="pl-8 my-2 h-full border-[1px] border-black/20 "
          />
        </div>
        <div className="h-[2.5rem] w-full  flex justify-center items-center gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="w-1/2 hover:bg-black/70 hover:text-white bg-black text-white border-[1px] border-black/15"
              >
                Space Tools
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="w-1/2 hover:bg-black/70 hover:text-white bg-black text-white border-[1px] border-black/15"
              >
                Create Team
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <p className="text-xl font-medium mt-4 pl-2">Teams Threads</p>
        <Separator className="bg-black/20 my-2" />
        <div className="flex flex-col justify-center items-start w-full h-auto gap-0 mt-5 mr-2 ">
          <ScrollArea className="h-full w-full rounded-md flex flex-col ">
            {teams &&
              teams.map((team, index) => (
                <CollapsibleThread team={team} key={index} />
              ))}
            {teams &&
              teams.map((team, index) => (
                <CollapsibleThread team={team} key={index} />
              ))}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

const CollapsibleThread = ({ team }: { team: TEAM }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div
      className={` w-full flex flex-col rounded-md ${!collapsed ? "bg-black/90" : "hover:bg-black/10"} py-2 my-[1px]`}
    >
      <div className="flex justify-between items-center  h-[2rem] w-full px-4  transition-all cursor-pointer">
        <span className="justify-start items-center flex h-full w-auto">
          {collapsed ? (
            <ChevronRight
              className="h-4 w-4 text-black"
              onClick={() => setCollapsed((e) => !e)}
            />
          ) : (
            <ChevronDown
              className="h-4 w-4 text-white"
              onClick={() => setCollapsed((e) => !e)}
            />
          )}
          <p
            className={` ${!collapsed ? "text-white" : "text-black"} font-medium ml-1 `}
            onClick={() => setCollapsed((e) => !e)}
          >
            {team.name}
          </p>
        </span>
        {!collapsed && (
          <div className="flex justify-end items-start gap-2 ">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex just-center items-center h-full ">
                  <AlertDialog>
                    <CreateThread teamId={team.id} />
                  </AlertDialog>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add Thread</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex just-center items-center h-full ">
                  <Bolt className="h-5 text-white/70 hover:text-white" />
                </TooltipTrigger>
                <TooltipContent className="bg-black font-medium ">
                  <p>Edit</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex just-center items-center h-full ">
                  <UserPlus className="h-5 text-white/70 hover:text-white" />
                </TooltipTrigger>
                <TooltipContent className="bg-black font-medium  border-[1px] border-white">
                  <p>Add User</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
      {!collapsed && (
        <div className={`flex flex-col ml-[2.5rem] gap-2 transition-all mb-2`}>
          {team.threads.map((thread, index) => (
            <div
              className={`flex justify-start items-center ${index === 0 && "mt-1"} 
              text-white/70 hover:text-white cursor-pointer`}
              key={index}
            >
              {thread.type === "chat" ? (
                <Hash
                  className={`h-5 w-5  p-0  mr-2 flex items-center justify-center`}
                />
              ) : (
                <Megaphone
                  className={`h-5 w-5  p-0  mr-2 flex items-center justify-center `}
                />
              )}
              <p
                className={` flex justify-center items-center   `}
                onClick={() => navigate("threads/" + thread.id)}
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
