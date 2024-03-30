import Loading from "@/components/ui/Loading";
import { Separator } from "@/components/ui/separator";
import { spaceDetailsAtom } from "@/features/store/atoms/spaces/space.atom";
import { Link, Outlet, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import _ from "lodash";
import { IoIosChatboxes, IoIosMegaphone } from "react-icons/io";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TeamsSideIcons } from "@/lib/static/spaces/sideBar";

const TeamPage = () => {
  const { spaceId, teamId } = useParams();
  const space = useRecoilValue(spaceDetailsAtom);

  const team = space?.teams?.find((team) => team.id === teamId);

  if (!team) {
    return (
      <div className="h-full w-full">
        <Loading />
      </div>
    );
  }
  const typeOfThreads: string[] = [];

  team.threads?.forEach((thread) => {
    if (!typeOfThreads.includes(thread.type)) {
      typeOfThreads.push(thread.type);
    }
  });

  return (
    <div className="h-full w-full py-2 flex">
      <div className="w-[25%] h-full flex flex-col justify-start items-center">
        <div className=" pl-3 h-[7%] w-full flex justify-start items-center font-semibold text-[1rem] text-white/80">
          <div
            className="h-3 w-3 mr-5 rounded-sm rotate-45"
            style={{ backgroundColor: team.color }}
          />
          <p>{team.name}</p>
        </div>
        <Separator className="bg-white/30" />
        <div className="h-[93%] w-full py-3">
          <div className="my-7 w-full px-2 gap-2 flex flex-col text-white/70">
            {TeamsSideIcons.map((ico) => {
              return (
                <Link
                  to={`/home/spaces/${spaceId}/team/${teamId}/${ico.href}`}
                  className={`flex justify-start h-8 rounded-lg items-center cursor-pointer border-0 w-full gap-2 pl-5 hover:bg-[#1C1C1C] hover:text-white/90`}
                >
                  <ico.icon className="text-[1.2rem]" />
                  <p className="font-sans">{ico.name}</p>
                </Link>
              );
            })}
          </div>

          <div className="h-[60%] w-full flex flex-col items-end overflow-hidden">
            <div className=" flex text-sans items-center justify-center w-[95%] gap-3 my-3  font-sans text-white/70">
              <p className="font-medium">THREADS</p>
              <Separator className="bg-white/60 w-[70%]" />
            </div>
            <div className="h-[50%] w-[90%] items-center flex flex-col">
              <ScrollArea className="h-full w-full">
                <Accordion type="single" collapsible className="w-full">
                  {typeOfThreads &&
                    typeOfThreads.map((type) => (
                      <AccordionItem value={type} className="border-0">
                        <AccordionTrigger className=" flex gap-0 text-[1rem] tracking-wide font-sans text-white/65">
                          <div className="flex gap-3 justify-center items-center">
                            <p>
                              {type === "announcement" ? (
                                <IoIosMegaphone className="text-lg" />
                              ) : (
                                <IoIosChatboxes className="text-lg" />
                              )}
                            </p>
                            <p className="">{_.upperFirst(type)}</p>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="border-0 pl-5">
                          {team.threads &&
                            team.threads.map(
                              (thread) =>
                                thread.type === type && (
                                  <Link
                                    to={`/home/spaces/${spaceId}/team/${teamId}/thread/${thread.id}`}
                                  >
                                    {thread.name}
                                  </Link>
                                )
                            )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                </Accordion>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[75%] h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default TeamPage;
