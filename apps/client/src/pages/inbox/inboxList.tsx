import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TypographyH2 } from "@/components/ui/typography/h2";
import { MailTypeAtom } from "@/features/store/atoms/inbox/mailType.atom";
import { useRecoilState } from "recoil";
import { InboxMailType } from "../../lib/types/type";
import { Input } from "@/components/ui/input";
import { Filter, FilterX, ListFilter, Search } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const InboxList = () => {
  const [mailType, setMailType] = useRecoilState(MailTypeAtom);

  return (
    <div className="h-full w-full">
      <div className="h-[8vh] w-full border-0 items-center flex justify-between px-3">
        <TypographyH2
          text="Inbox"
          className="flex justify-center items-center"
        />
        <Tabs
          defaultValue={mailType}
          className="w-[13vw] h-[3.2rem] border-0 bg-[#F4F4F5] text-[#52525B] flex justify-center items-center rounded-lg"
        >
          <TabsList className="w-full h-full">
            <TabsTrigger
              value={"all"}
              className="h-full w-1/2"
              onClick={() => {
                setMailType("all");
              }}
            >
              All mail
            </TabsTrigger>
            <TabsTrigger
              value={"unread"}
              className="h-full w-1/2"
              onClick={() => {
                setMailType("unread");
              }}
            >
              Unread
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <Separator />
      <div className="h-[92vh] w-full">
        <div className="h-[7%] border-0 p-2 flex justify-center items-center">
          <form className="h-full w-[95%]">
            <div className="relative h-full w-full flex justify-center items-center">
              <Search className="absolute left-3  h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="pl-8 w-full h-full" />
            </div>
          </form>
          <div className="h-full w-[5rem] flex justify-center items-center ">
            <span className="h-[2.8rem] w-[3rem] rounded-md cursor-pointer bg-[#efeff0] flex justify-center items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <ListFilter />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Filters</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
          </div>
        </div>
        <div className="h-[93%] border-0"></div>
      </div>
    </div>
  );
};

export default InboxList;
