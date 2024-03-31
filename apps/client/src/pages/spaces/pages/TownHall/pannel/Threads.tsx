import Loading from "@/components/ui/Loading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectTrigger } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { createThread } from "@/features/funcs/threads/createThread";
import { useGetTownHall } from "@/features/hooks/spaces/useGetTownHall";
import _ from "lodash";
import {
  IoIosChatboxes,
  IoIosMegaphone,
  IoMdMusicalNote,
} from "react-icons/io";
import { Link, Outlet, useParams } from "react-router-dom";
import CreateThread from "../../threads/createThread";
import { THREAD_TYPE } from "@/lib/types/type";
import { IoChatbox } from "react-icons/io5";
import { BsPersonVideo } from "react-icons/bs";
import { MdHeadphones } from "react-icons/md";

const Threads = () => {
  const { loading, Townhall } = useGetTownHall();
  const { spaceId, threadId } = useParams();

  if (loading || Townhall === null) {
    return (
      <div className="h-full w-full flex justify-center items-center text-white/60">
        <Loading />
      </div>
    );
  }

  const typeOfThreads: THREAD_TYPE[] = [];

  Townhall.threads?.forEach((thread) => {
    if (!typeOfThreads.includes(thread.type)) {
      typeOfThreads.push(thread.type);
    }
  });

  return (
    <div className="h-full w-full p-2 flex justify-between items-center">
      <div className=" h-full w-[22%] rounded-lg flex flex-col">
        <div className="w-full flex gap-2 my-1">
          <Dialog>
            <DialogTrigger className="w-1/2">
              <Button className="w-full h-full bg-white/85 text-black font-medium hover:bg-transparent hover:text-white/85">
                Create Thread
              </Button>
            </DialogTrigger>
            <DialogContent className=" bg-[#0F0F0F] p-0 border-0 text-white/85 rounded-xl overflow-hidden">
              <CreateThread teamId={Townhall.id} />
            </DialogContent>
          </Dialog>
          <Button className="w-1/2 h-full bg-white/85 text-black font-medium hover:bg-transparent hover:text-white/85">
            Some Button
          </Button>
        </div>
        <ScrollArea className="h-full w-full p-3 px-5">
          <Accordion type="single" collapsible className="w-full">
            {typeOfThreads &&
              typeOfThreads.map((type) => (
                <AccordionItem value={type} className="border-0">
                  <AccordionTrigger className=" flex gap-0 text-[1rem] tracking-wide font-sans text-white/65">
                    <div className="flex gap-3 justify-center items-center">
                      <p>
                        {type === "announcement" && (
                          <IoIosMegaphone className="text-lg" />
                        )}
                        {type === "audio" && (
                          <MdHeadphones className="text-lg" />
                        )}
                        {type === "jam" && (
                          <IoMdMusicalNote className="text-lg" />
                        )}
                        {type === "chat" && <IoChatbox className="text-lg" />}
                        {type === "video" && (
                          <BsPersonVideo className="text-lg" />
                        )}
                      </p>
                      <p className="">{_.upperFirst(type)}</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-5 w-full  flex flex-col justify-start items-start">
                    {Townhall.threads &&
                      Townhall.threads.map(
                        (thread) =>
                          thread.type === type && (
                            <div className="flex items-center gap-2 mb-2">
                              &#62;
                              <Link
                                to={`/home/spaces/${spaceId}/townhall/threads/${thread.id}`}
                                className={` text-white/55 hover:bg-white/10 w-[95%] min-h-[1.7rem] flex flex-wrap justify-start items-center px-2 rounded-md ${thread.id === threadId && "bg-white/10  text-white "}`}
                              >
                                {thread.name}
                              </Link>
                            </div>
                          )
                      )}
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </ScrollArea>
      </div>
      <Separator orientation="vertical" className="mx-1 bg-white/20" />
      <div className="w-[77%] h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Threads;
