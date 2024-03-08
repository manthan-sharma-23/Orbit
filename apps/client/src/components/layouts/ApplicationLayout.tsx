import { useGetUser } from "@/features/hooks/root/useGetUser";
import { userAtom } from "@/features/store/atoms/user.atom";
import { Link, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Separator } from "../ui/separator";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { navoption } from "@/lib/static/bar.icons";
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
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TypographySmall } from "../ui/typography/small";

const ApplicationLayout = () => {
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

  return (
    <div className="h-full w-full ">
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border w-full"
      >
        <ResizablePanel
          defaultSize={16}
          maxSize={16}
          minSize={12}
          collapsible
          onCollapse={() => {
            setBarCollapse(true);
          }}
        >
          <div className="flex h-full items-center justify-center p-0">
            <div className="w-full h-full">
              <div className=" relative z-20 flex justify-center items-center px-1 text-xl font-medium h-[8vh] overflow-hidden">
                <Drawer>
                  <DrawerTrigger className="w-full h-auto flex justify-start items-start p-0">
                    <Button
                      variant={"outline"}
                      className=" h-full w-full flex justify-start items-center gap-2 p-2 px-3"
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
                      <Button>Submit</Button>
                      <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
              <Separator className="mb-4" />
              <div className="flex flex-col items-start justify-between h-[92vh] pb-6">
                <div className="h-full w-full flex flex-col justify-start items-center p-2 gap-1">
                  {navoption.bar.map((link, index) => {
                    return (
                      <>
                        <Link
                          key={index}
                          to="#"
                          className={`w-full flex justify-between items-center p-2 px-4 ${index === 0 && "bg-[#18181B] text-white"} rounded-md `}
                        >
                          <p className="flex  justify-start items-center">
                            <link.icon className="mr-2 h-4 w-4" />
                            {link.title}
                          </p>
                          {link.label && (
                            <span className={""}>{link.label}</span>
                          )}
                        </Link>
                        {index === 4 && <Separator className="my-4" />}
                      </>
                    );
                  })}
                </div>
                <div className="h-[5vh] w-full">
                  <Separator />
                  <div className="p-4 relative z-20 flex items-center justify-center text-xl font-medium h-[52px] overflow-hidden">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-6 w-6 cursor-pointer"
                    >
                      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                    </svg>
                    <p>Orbit Inc.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle
          withHandle
          onResize={(e) => {
            console.log("Hey");
            console.log(e);
          }}
        />
        <ResizablePanel defaultSize={82}>
          <Outlet />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ApplicationLayout;
