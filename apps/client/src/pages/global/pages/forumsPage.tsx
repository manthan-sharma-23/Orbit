import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock3, Plus, TrendingUp } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FORUM_TYPE } from "typings";

const ForumsPage = () => {
  const [page, setPage] = useState<"recent" | "trending">("recent");
  return (
    <div className="h-full w-full text-white">
      <ScrollArea className="h-full w-full text-white">
        <div className="h-[5vh] w-[75%] ml-3 flex justify-center items-center border-0 gap-3 mt-4">
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
            className="w-[40%] h-full border-[.6px] border-white/60 focus-visible:ring-[2.5px] focus-within:border-blue-400/80 focus-visible:ring-blue-600/40 bg-white/5  rounded-md "
            placeholder="Search"
          />
          <Dialog>
            <DialogTrigger className="p-0 h-full">
              <Button
                variant="default"
                className=" bg-blue-600/40 text-blue-400 hover:bg-blue-600/60 h-full min-w-[6vw] flex justify-center items-center gap-1 rounded-md font-mono text-[1rem]"
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
              <DialogHeader className="h-auto">
                <DialogTitle className="font-mono text-white mb-3">
                  CREATE FORUM
                </DialogTitle>
                <DialogDescription>
                  <form className="h-auto w-full flex flex-col justify-center items-center gap-3">
                    <Input
                      className="border-[.6px] border-white/60 focus-visible:ring-[2.5px] focus-within:border-blue-400/80 focus-visible:ring-blue-600/40 bg-white/5  rounded-xs "
                      placeholder="Enter Forum Title"
                    />
                    <Select>
                      <SelectTrigger className="border-[.6px] border-white/60 focus-visible:ring-[2.5px] focus-within:border-blue-400/80 focus-visible:ring-blue-600/40 bg-white/5  rounded-xs ">
                        <SelectValue
                          placeholder="Select type of forum"
                          className="text-white"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value={FORUM_TYPE.PUBLIC_DISCUSSIONS}>
                            Public Discussions
                          </SelectItem>
                          <SelectItem value={FORUM_TYPE.PRODUCT_IDEAS}>
                            Product Ideas
                          </SelectItem>
                          <SelectItem value={FORUM_TYPE.COLLABORATIONS}>
                            Collaborations
                          </SelectItem>
                          <SelectItem value={FORUM_TYPE.TECHNICAL_QUESTIONS}>
                            Technical Questions
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Textarea
                      className="min-h-[5rem] border-[.6px] border-white/60 focus-visible:ring-[2.5px] focus-within:border-blue-400/80 focus-visible:ring-blue-600/40 bg-white/5  rounded-xs "
                      placeholder="Enter Forum Title"
                    />
                    <div className="flex justify-end items-center  w-full">
                      <Button
                        type="submit"
                        variant="default"
                        className=" bg-blue-600/40 text-blue-400 hover:bg-blue-600/60 h-full min-w-[6vw] flex justify-center items-center gap-1 rounded-sm font-mono text-[1rem]"
                        aspect-auto
                      >
                        <p className="relative top-[1.5px] border-0 h-full  flex items-center justify-center font-mono">
                          POST
                        </p>
                      </Button>
                    </div>
                  </form>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ForumsPage;
