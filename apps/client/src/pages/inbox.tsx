import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { TypographyH1 } from "@/components/ui/typography/h1";
import { TypographyH2 } from "@/components/ui/typography/h2";
import { TypographyP } from "@/components/ui/typography/paragraph";
import { userAtom } from "@/features/store/atoms/user.atom";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Info, Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Inbox = () => {
  const [date, setDate] = useState<Date>();
  const { path } = useParams();
  const user = useRecoilValue(userAtom);

  return (
    <>
      <div className="h-full w-full ">
        <div className="h-[8vh] w-full flex justify-start items-center gap-3 p-2">
          <div className="h-[5vh] w-[30%]">
            <Tabs
              defaultValue="account"
              className="w-full h-full flex justify-start items-center p-0"
            >
              <TabsList className="w-full h-full  border-[1px] border-black/25 bg-[#EBEBEB] text-black text-xl flex justify-evenly items-center">
                <TabsTrigger
                  value="account"
                  className="h-full text-[1rem] w-[25%]"
                >
                  Account
                </TabsTrigger>
                <TabsTrigger
                  value="Mails"
                  className="h-full text-[1rem] w-[25%]"
                >
                  Mails
                </TabsTrigger>
                <TabsTrigger
                  value="Invites"
                  className="h-full text-[1rem] w-[25%]"
                >
                  Invites
                </TabsTrigger>
                <TabsTrigger
                  value="Assignments"
                  className="h-full text-[1rem] w-[25%]"
                >
                  Assignments
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="h-[5vh] w-[40%] flex justify-center items-center">
            <form className="h-full w-full flex justify-center items-center">
              <div className="relative w-full h-full  flex justify-center items-center ">
                <div>
                  <Search className="absolute left-2 top-0 w-5 text-muted-foreground flex item-center h-full" />
                </div>
                <Input
                  placeholder="Search your inbox"
                  className="pl-9 h-full border-[1px] border-black/25"
                />
              </div>
            </form>
          </div>
          <div className="w-[30%] h-[5vh] flex justify-end items-center gap-3">
            <Popover >
              <PopoverTrigger asChild className="h-full w-[50%] border-[1px] border-black/45 ">
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal h-full w-[50%]",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 w-4 h-full  border-black/80" />
                  {date ? (
                    format(date, "PPP")
                  ) : (
                    <span className="tracking-wide ">Filter by Date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <p className="h-full">
              <Info className="cursor-pointer h-full w-auto rounded-md p-2 bg-black/90 text-white " />
            </p>
          </div>
        </div>
        <Separator />
        <div className="h-[92vh] w-full"></div>
      </div>
      <div className="h-full w-full flex flex-col p-2 px-4 gap-2">
        <div className="h-[15vh] w-full flex justify-start items-center ">
          <div className="w-[40%] h-full p-3 flex flex-col justify-center items-start">
            <TypographyH1
              text={`Good Morning ${user.user?.name?.split(" ")[0]}`}
            />
            <TypographyP text="New guy here alright!" />
          </div>
          <div className="w-[60%] h-full"> Hey</div>
        </div>
        <div className="h-[85vh] w-full ">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Inbox;
