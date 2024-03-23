import ChatTextArea from "@/components/elements/ChatTextArea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TypographyH3 } from "@/components/ui/typography/h3";
import {
  mailEditBarIcons1,
  mailEditBarIcons2,
} from "@/lib/static/inbox/inbox.edits.bar.icons";
import _ from "lodash";
import moment from "moment";
import React from "react";
import { useParams } from "react-router-dom";
import { MAIL } from "typings";

const mail: MAIL = {};

export const MailEdit = () => {
  const { mailId } = useParams();

  return (
    <div className="h-full w-full flex flex-col">
      <div className="h-[8vh] w-full flex justify-between items-center px-2">
        <span className="flex justify-start items-center gap-2">
          {mailEditBarIcons1.map((Ico, index) => (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className=" rounded-lg h-[2.7rem] w-[2.7rem] hover:bg-[#EFEFF0] flex justify-center items-center p-[.7rem]">
                    <Ico.Icon />
                  </TooltipTrigger>
                  <TooltipContent className="bg-black">
                    <p>{_.upperFirst(Ico.name)}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          ))}
        </span>
        <span className="flex justify-start items-center gap-2">
          {mailEditBarIcons2.map((Ico, index) => (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="rounded-lg h-[2.7rem] w-[2.7rem] hover:bg-[#EFEFF0] flex justify-center items-center p-[.7rem]">
                    <Ico.Icon />
                  </TooltipTrigger>
                  <TooltipContent className="bg-black">
                    <p>{_.upperFirst(Ico.name)}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          ))}
        </span>
      </div>
      <Separator />
      <div className="h-[92vh] w-full">
        <div className="h-[83%] w-full">
          <ScrollArea className="h-full w-full rounded-md border-0 p-4 flex flex-col">
            <div className="flex">
              <div className="w-[70%] h-auto flex flex-col gap-1">
                <TypographyH3 text={mail.title} />
                <div className="flex font-medium text-black/70 gap-2 italic">
                  <p>By:</p> <p>{mail.User?.name + " , " + mail.User?.email}</p>
                </div>
                <div className="flex font-semibold gap-2">
                  <p> Description:</p> <p>{mail.description}</p>
                </div>
              </div>
              <div className="w-[30%] h-auto font-mono flex justify-end items-center tracking-tighter">
                {moment(mail.createdAt).format("LLL")}
              </div>
            </div>
            <Separator className="my-4" />
            <div className="mb-[20vh]">{mail.data}</div>
          </ScrollArea>
        </div>
        <div className="h-[17%] w-full p-0 py-1 px-2 rounded-t-lg ">
          <ChatTextArea
            value=" "
            onChange={() => {}}
            handleSendMessage={() => {}}
          />
        </div>
      </div>
    </div>
  );
};
