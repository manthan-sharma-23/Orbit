import Loading from "@/components/ui/Loading";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useGetSpaceDetails } from "@/features/hooks/spaces/useGetSpaceDetails";
import { spaceDetailsAtom } from "@/features/store/atoms/spaces/space.atom";
import _ from "lodash";
import React, { useState } from "react";
import { BiDotsVertical } from "react-icons/bi";
import { useRecoilValue } from "recoil";
import UserInteract from "@/pages/global/pages/find_users/user_interact";
import { userAtom } from "@/features/store/atoms/user.atom";
import {
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { FaUserPlus } from "react-icons/fa6";

const SpaceInfo = () => {
  const { loading } = useGetSpaceDetails();
  const { user } = useRecoilValue(userAtom);
  const space = useRecoilValue(spaceDetailsAtom);
  const [expandTeams, setExpandTeams] = useState(false);

  if (loading || !space.UserSpace) {
    return (
      <div className="h-full w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="text-white h-[92vh] w-full flex justify-evenly items-center">
      <div className="h-full w-[60%] py-4 mr-10">
        <div className="h-[10%] w-full flex justify-between items-center">
          <div className="h-full w-full flex justify-start items-center gap-5">
            <div className="h-full w-auto border border-white/30 p-1 rounded-md">
              <img
                src={space.image}
                className="h-full border border-white/15 p-1"
              />
            </div>
            <div className="h-full w-[40%] flex flex-col justify-around items-start gap">
              <p className="text-2xl font-semibold text-white/90">
                {_.upperCase(space.name)}
              </p>
            </div>
          </div>
          <p>
            <BiDotsVertical className="text-3xl cursor-pointer text-white/70" />
          </p>
        </div>
        <Separator className="my-4 bg-white/10" />
        <div className="h-[90%] w-full  pb-2">
          <ScrollArea type="hover" className="h-full w-full">
            <div
              onClick={() => setExpandTeams((v) => !v)}
              className={`w-full  ${expandTeams ? "h-auto" : "h-[20vh]"} relative transition-all overflow-hidden`}
            >
              <div className="transition-all absolute right-0 flex justify-center items-center bottom-0 h-[1.5rem] cursor-pointer w-[1.5rem] text-white/55 border  rounded-md border-white/55  text-lg">
                {!expandTeams ? (
                  <MdKeyboardDoubleArrowDown />
                ) : (
                  <MdKeyboardDoubleArrowUp />
                )}
              </div>
            </div>
            <Separator className="my-2 bg-white/10" />
          </ScrollArea>
        </div>
      </div>
      <div className="w-[30%] h-full flex flex-col justify-start items-center py-4">
        <div className="h-[3rem] w-full flex justify-center items-center gap-2">
          <Input
            className="w-full h-full border-[.6px] border-white/60 focus-visible:ring-[2.5px] focus-within:border-[#849DFE] focus-visible:ring-[#131620] bg-white/5  rounded-md "
            placeholder="Search"
          />
          <Button className="h-[3rem] w-[3rem] bg-white/10 border border-white/60 text-[1.4rem]">
            <FaUserPlus />
          </Button>
        </div>
        <span className="px-1 font-sans w-full h-[2rem] mt-2 flex justify-between items-center font-semibold text-white/60">
          <p>Members</p>
          <p>{space.UserSpace.length}</p>
        </span>
        <div className="w-full h-[75vh] pt-4">
          <ScrollArea className="h-full w-full ">
            {space.UserSpace &&
              space.UserSpace.map((userSpace, index) => (
                <Dialog key={index}>
                  <DialogTrigger className="h-[4rem] w-full mb-2">
                    <div className="h-full w-full hover:border rounded-md border-white/30 text-white/55 hover:text-white/85 cursor-pointer hover:bg-white/5 overflow-hidden hover:p-[1px] flex justify-between">
                      <img
                        src={userSpace.user.image}
                        className="h-full rounded-md"
                      />
                      <div className="w-[45%] flex flex-col items-start justify-center gap-1 h-full">
                        <p className="text-auto">
                          {userSpace.user.id === user?.id
                            ? "You"
                            : userSpace.user.name}
                        </p>
                        <p className="text-sm">@{userSpace.user.username}</p>
                      </div>
                      <div className="w-[25%] h-full flex justify-center items-center text-[.9rem] ">
                        {_.upperFirst(userSpace.role)}
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent
                    style={{
                      fontFamily: '"Kode Mono", monospace',
                      borderRadius: "2px",
                    }}
                    className="bg-[#0F0F0F] text-white border-none p-0 border-white/50"
                  >
                    {userSpace.user && (
                      <UserInteract userId={userSpace.user.id!} />
                    )}
                  </DialogContent>
                </Dialog>
              ))}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default SpaceInfo;
