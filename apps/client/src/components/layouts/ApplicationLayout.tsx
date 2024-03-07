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
          <div className="flex h-full items-center justify-center p-1">
            <div className="w-full h-full">
              <div className="p-3 relative z-20 flex items-center text-xl font-medium h-[52px] overflow-hidden">
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
                <p>Orbit Inc</p>
              </div>
              <Separator className="mb-4" />
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
                        {link.label && <span className={""}>{link.label}</span>}
                      </Link>
                      {index === 4 && <Separator className="my-4" />}
                    </>
                  );
                })}
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
