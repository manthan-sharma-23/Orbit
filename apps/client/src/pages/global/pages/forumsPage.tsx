import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock3, Plus, TrendingUp } from "lucide-react";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateForum from "./createForum";
import ForumsList from "./forumsList";

const ForumsPage = () => {
  const [page, setPage] = useState<"recent" | "trending">("recent");

  return (
    <div className="h-full w-full text-white">
      <ScrollArea className="h-full w-full text-white">
        <div className="w-[75%] flex flex-col justify-center items-center ml-3">
          <div className="h-[5vh] w-full flex justify-center items-center border-0 gap-3 mt-4 ">
            <Button
              variant="ghost"
              className={`bg-transparent ${page === "trending" ? "bg-white/15 text-white/90" : "hover:bg-white/15 hover:text-white/90"} h-full  min-w-[6vw] flex justify-center items-center gap-2 rounded-md font-mono text-[1rem]`}
              aspect-auto
              onClick={() => setPage("trending")}
            >
              <TrendingUp className="p-[1px]" />
              <p>TRENDING</p>
            </Button>
            <Button
              variant="ghost"
              className={`bg-transparent ${page === "recent" ? "bg-white/15 text-white/90" : "hover:bg-white/15 hover:text-white/90"} h-full  min-w-[6vw] flex justify-center items-center gap-2 rounded-md font-mono text-[1rem]`}
              aspect-auto
              onClick={() => setPage("recent")}
            >
              <Clock3 className="p-[1px]" />
              <p>RECENT</p>
            </Button>
            <Input
              className="w-[60%] h-full border-[.6px] border-white/60 focus-visible:ring-[2.5px] focus-within:border-[#849DFE] focus-visible:ring-[#131620] bg-white/5  rounded-md "
              placeholder="Search"
            />
            <Dialog>
              <DialogTrigger className="p-0 h-full">
                <Button
                  variant="default"
                  className=" bg-[#131620] ring-[.7px] ring-[#849DFE] text-blue-400 hover:bg-[#161925] h-full min-w-[6vw] flex justify-center items-center gap-1 rounded-sm font-mono text-[1.3rem]"
                  aspect-auto
                >
                  <span className="h-full flex justify-center items-center">
                    <Plus className="p-[2px] text-center" />
                  </span>
                  <p className="relative top-[1.5px] border-0 h-full  flex items-center justify-center font-mono">
                    POST
                  </p>
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#0F0F0F] text-white border-[1.5px] border-white/30 h-auto">
                <CreateForum />
              </DialogContent>
            </Dialog>
          </div>
          <div className="min-h-[95vh] w-full flex flex-col justify-start items-center border-0">
            <ForumsList />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ForumsPage;
