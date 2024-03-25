import Loading from "@/components/ui/Loading";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createForum } from "@/features/funcs/forums/createForum";
import { FORUM_TYPE } from "@/lib/types/type";
import React, { useCallback, useState } from "react";

interface forumInput {
  title: string;
  forum_type: string;
  data: string;
}

const CreateForum = () => {
  const [loading, setLoading] = useState(false);
  const [forumDetails, setForumDetails] = useState<forumInput>({
    title: "",
    forum_type: "",
    data: "",
  });

  const createForumHandler = async () => {
    console.log(forumDetails);

    setLoading(true);
    createForum(forumDetails)
      .then((_data) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <DialogHeader className="h-auto rounded-none">
      <DialogTitle className="font-mono text-white mb-3">
        CREATE FORUM
      </DialogTitle>
      <DialogDescription>
        <form
          className="h-auto w-full flex flex-col justify-center items-center gap-3 text-white/80"
          onSubmit={createForumHandler}
        >
          <Input
            className="border-[.6px] border-white/60 focus-visible:ring-[2.5px]  focus-within:border-blue-400/80 focus-visible:ring-blue-600/40 bg-white/5  rounded-xs "
            placeholder="Enter Forum Title"
            onChange={(e) => {
              // console.log(e.target.value);
              setForumDetails((v) => ({ ...v, title: e.target.value }));
            }}
          />
          <Select
            onValueChange={(value) => {
              setForumDetails((v) => ({ ...v, forum_type: value }));
            }}
          >
            <SelectTrigger className=" font-medium border-[.6px] border-white/60 focus-within:ring-[2.5px] focus-within:border-blue-400/80 focus:ring-3 focus:ring-blue-600/40 bg-white/5  rounded-xs ">
              <SelectValue
                placeholder="Select type of forum"
                className="text-white"
              />
            </SelectTrigger>
            <SelectContent className="bg-[#1B1B1B] text-white/80 border-[.6px] ring-[2px] rounded-none border-blue-400/80 ring-blue-600/40">
              <SelectGroup className="cursor-pointer">
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
            className="min-h-[10rem] border-[.6px] border-white/60 focus-visible:ring-[2.5px] focus-within:border-blue-400/80 focus-visible:ring-blue-600/40 bg-white/5 rounded-xs"
            style={{ height: "auto", resize: "vertical" }} // Added style attribute
            placeholder="Enter Forum Title"
            onChange={(e) => {
              // console.log(e.target.value);
              setForumDetails((v) => ({ ...v, data: e.target.value }));
            }}
          />

          <div className="flex justify-end items-center  w-full">
            <Button
              type="submit"
              disabled={loading}
              variant="default"
              className=" bg-blue-600/40 text-blue-400 hover:bg-blue-600/60 h-full min-w-[6vw] flex justify-center items-center gap-1 rounded-sm font-mono text-[1rem]"
              aspect-auto
            >
              {loading ? (
                <Loading />
              ) : (
                <p className="relative top-[1.5px] border-0 h-full  flex items-center justify-center font-mono">
                  POST
                </p>
              )}
            </Button>
          </div>
        </form>
      </DialogDescription>
    </DialogHeader>
  );
};

export default CreateForum;
