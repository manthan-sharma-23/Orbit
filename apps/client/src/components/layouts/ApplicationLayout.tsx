import { useGetUser } from "@/features/hooks/root/useGetUser";
import { userAtom } from "@/features/store/atoms/user.atom";
import { Link, Outlet, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Separator } from "../ui/separator";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { navoption } from "@/lib/static/bar.icons";
import _ from "lodash";
import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button, buttonVariants } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TypographySmall } from "../ui/typography/small";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const ApplicationLayout = () => {
  const { path } = useParams();
  const user = useRecoilValue(userAtom);
  const [barCollapse, setBarCollapse] = useState(false);
  useGetUser();

  if (user.loading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        Loading...
      </div>
    );
  }

  console.log(barCollapse);

  return (
    <div className="h-full w-full ">
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border-0 w-full"
      >
        <TooltipProvider delayDuration={0}>
          <ResizablePanel
            defaultSize={barCollapse ? 4 : 12}
            maxSize={15}
            minSize={9}
            collapsible
            collapsedSize={4}
            onCollapse={() => {
              setBarCollapse(true);
            }}
            onExpand={() => {
              setBarCollapse(false);
            }}
            autoSave="23saveBar"
            className="border-0"
          >
            {barCollapse ? (
              <div className="flex h-full items-center justify-center p-0 bg-black border-black">
                <div className="w-full h-full bg-black">
                  <div className=" relative z-20 flex justify-center items-center px-1 text-xl font-medium h-[8vh] overflow-hidden">
                    <Drawer>
                      <DrawerTrigger className="w-full h-auto flex justify-start items-start p-0">
                        <Button
                          variant={"outline"}
                          className="border-[1px] border-white/65 h-full w-full flex justify-start items-center gap-2 p-2 px-3 bg-black text-white"
                          size={"lg"}
                        >
                          <Avatar>
                            <AvatarImage src="/avatars/02.png" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent className="h-screen w-screen">
                        <DrawerHeader>
                          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                          <DrawerDescription>
                            This action cannot be undone.
                          </DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter>
                          <Button
                            onClick={() => {
                              window.localStorage.removeItem("token");
                              window.location.assign("/auth/signin");
                            }}
                          >
                            Logout
                          </Button>
                          <DrawerClose>
                            <Button variant="outline">Cancel</Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                  </div>
                  <Separator className="mb-4 bg-white/60" />
                  <div className="flex flex-col items-start justify-between h-[92vh] pb-6">
                    <div className="h-full w-full flex flex-col justify-start items-center p-0 gap-1">
                      {navoption.bar.map((link, index) => {
                        return (
                          <>
                            <Tooltip key={index} delayDuration={0}>
                              <TooltipTrigger asChild>
                                <Link
                                  to={"/home/" + link.href}
                                  className={`text-white h-[2.6rem] w-[2.6rem] rounded-md flex justify-center items-center dark:bg-muted ${path === link.href ? "bg-black text-white" : "hover:bg-black/10"} dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-black`}
                                >
                                  <link.icon className="h-[1.3rem] w-[1.3rem]" />
                                  <span className="sr-only">{link.title}</span>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent
                                side="right"
                                className="flex items-center gap-4 text-white"
                              >
                                {link.title}
                                {link.label && (
                                  <span className="ml-auto text-muted-foreground">
                                    {link.label}
                                  </span>
                                )}
                              </TooltipContent>
                            </Tooltip>
                            {index === 5 && (
                              <Separator className="my-2 bg-white/60" />
                            )}
                          </>
                        );
                      })}
                    </div>
                    <div className="h-[5vh] w-full">
                      <Separator className="bg-white/60" />
                      <div className="p-4 relative z-20 flex items-center justify-center text-xl font-medium h-[52px] overflow-hidden">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="inverted"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="my-2 h-6 w-6 cursor-pointer"
                        >
                          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center p-0 bg-black">
                <div className="w-full h-full">
                  <div className=" relative z-20 flex justify-center items-center px-1 text-xl font-medium h-[8vh] overflow-hidden">
                    <Drawer>
                      <DrawerTrigger className="w-full h-auto flex justify-start items-start p-0">
                        <Button
                          variant={"ghost"}
                          className=" border-white/60 h-full w-full flex justify-start items-center gap-2 p-2 px-3 bg-black text-white/80 hover:bg-white/20 hover:text-white"
                          size={"lg"}
                        >
                          <Avatar>
                            <AvatarImage src="/avatars/02.png" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <TypographySmall
                            text={user.user?.name}
                            className={"font-sans tracking-wider"}
                          />
                          <div className="text-sm">
                            <ChevronDown className="p-1" />
                          </div>
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent className="h-screen w-screen">
                        <DrawerHeader>
                          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                          <DrawerDescription>
                            This action cannot be undone.
                          </DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter>
                          <Button
                            onClick={() => {
                              window.localStorage.removeItem("token");
                              window.location.assign("/auth/signin");
                            }}
                          >
                            Logout
                          </Button>
                          <DrawerClose>
                            <Button variant="outline">Cancel</Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                  </div>
                  <Separator className="mb-4 bg-white/50 " />
                  <div className="flex flex-col items-start justify-between h-[92vh] pb-6">
                    <div className="h-full w-full flex flex-col justify-start items-center p-2 gap-1">
                      {navoption.bar.map((link, index) => {
                        return (
                          <>
                            <Link
                              key={index}
                              to={"/home/" + link.href}
                              className={` w-full flex justify-between items-center p-2 px-4 ${path === link.href ? "bg-white/80 text-black" : "text-white"} rounded-md ${path !== link.href && "hover:bg-white/10"}`}
                            >
                              <p className="flex  justify-start items-center">
                                <link.icon className="mr-2 h-4 w-4" />
                                <p>{link.title}</p>
                              </p>
                              {link.label && <span>{link.label}</span>}
                            </Link>
                            {index === 5 && (
                              <Separator className="my-4 bg-white/50" />
                            )}
                          </>
                        );
                      })}
                    </div>
                    <div className="h-[5vh] w-full">
                      <Separator className="bg-white/60" />
                      <div className="p-4 relative z-20 flex items-center justify-center text-xl font-medium h-[52px] overflow-hidden text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-6 w-6"
                        >
                          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                        </svg>
                        <p>Orbit Inc.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </ResizablePanel>
        </TooltipProvider>
        <ResizableHandle withHandle className="bg-black/50" />
        <ResizablePanel defaultSize={82}>
          <Outlet />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ApplicationLayout;
