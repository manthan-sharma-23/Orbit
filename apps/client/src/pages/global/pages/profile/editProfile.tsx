import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { userAtom } from "@/features/store/atoms/user.atom";
import React from "react";
import { MdOutlineWork } from "react-icons/md";
import {
  FaGithub,
  FaLinkedin,
  FaLinkedinIn,
  FaUser,
  FaXTwitter,
} from "react-icons/fa6";
import { useRecoilValue } from "recoil";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

const EditProfile = () => {
  const { user } = useRecoilValue(userAtom);
  return (
    <div
      className="h-full w-full flex justify-start p-5 items-center"
      style={{ fontFamily: ' "Kode Mono", monospace' }}
    >
      <ScrollArea className="h-full w-full">
        <div className="w-[70%] h-full">
          <div className="h-auto px-2 py-2 rounded-sm w-full flex text-xl gap-3 mb-2 bg-white/5">
            <p className="font-bold text-white/85">/// EDIT PROFILE</p>
            <p className="text-white/10">
              ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
            </p>
          </div>
          <div className="h-[18vh] w-full flex justify-center items-center gap-4 mb-5">
            <span className="h-[9rem] w-[8rem] cursor-pointer  ">
              <div className="h-[7.8rem] w-[7.8rem]  flex flex-col justify-center items-center border-[1px] border-white/10">
                <img
                  src={user?.image}
                  className="h-[7rem] w-[7rem] overflow-hidden"
                />
              </div>
              <p className="hover:bg-white/10 tracking-wide h-[2rem] font-semibold w-[7.8rem] text-sm flex justify-center items-center border border-t-0 border-white/10">
                AVATAR
              </p>
            </span>
            <div className=" h-[9.6rem] w-full relative top-2 flex flex-col justify-around items-center">
              <Input
                className="border-[.6px] disabled:bg-blue-500/10 border-white/60 focus-visible:ring-[2.5px] focus-within:border-[#849DFE] focus-visible:ring-[#131620]   rounded-sm "
                placeholder="Name"
                value={user?.name}
                disabled
              />
              <div className="flex w-full">
                <p className="h-full w-[3.4rem] flex items-center justify-center text-2xl bg-white/10 border border-r-0 border-white/30 text-white/50">
                  @
                </p>
                <Input
                  className="border-[.6px] border-white/40 focus-visible:ring-[2.5px] focus-within:border-[#849DFE] focus-visible:ring-[#131620] bg-white/5  rounded-sm "
                  placeholder="Username"
                  value={user?.username.slice(1)}
                />
                <Button className="bg-blue-700/30 rounded-none">
                  CHECK AVAILIBILITY
                </Button>
              </div>
              <Input
                className="border-[.6px] disabled:bg-blue-500/10 border-white/60 focus-visible:ring-[2.5px] focus-within:border-[#849DFE] focus-visible:ring-[#131620]   rounded-sm "
                placeholder="Search"
                value={user?.email}
                disabled
              />
            </div>
          </div>
          <Separator className="my-5 bg-white/10" />
          <div className="w-full ">
            <p className="text-lg font-medium mb-2 w-[30%]">&#62; ABOUT ME</p>
            <Textarea
              className="mb-2 min-h-[9rem] max-h-[9rem] overflow-hidden border-[.6px] border-white/30 focus-visible:ring-[2.5px] focus-within:border-blue-400/80 focus-visible:ring-blue-600/40 bg-white/5 rounded-xs"
              style={{ height: "auto", resize: "none" }} // Added style attribute
              placeholder="About Me Section"
              value={user?.about}
            />
            <div className=" h-auto w-full mb-4 flex gap-3">
              <div className="h-auto w-1/3 flex">
                <p className="p-[10px] h-[2.3rem] w-[2.3rem] flex items-center justify-center text-2xl bg-white/10 border border-r-0 border-white/30 text-white/50">
                  <FaUser />
                </p>
                <Input
                  className="h-[2.3] border-[.6px] border-white/40 focus-visible:ring-[2.5px] focus-within:border-[#849DFE] focus-visible:ring-[#131620] bg-white/5  rounded-sm "
                  placeholder="Enter your Person"
                />
              </div>
              <div className="h-auto w-2/3 flex">
                <p className="p-2 h-[2.3rem] w-[2.3rem] flex items-center justify-center text-2xl bg-white/10 border border-r-0 border-white/30 text-white/50">
                  <MdOutlineWork />
                </p>
                <Input
                  className="h-[2.3] border-[.6px] border-white/40 focus-visible:ring-[2.5px] focus-within:border-[#849DFE] focus-visible:ring-[#131620] bg-white/5  rounded-sm "
                  placeholder="Enter your Job title"
                  value={user?.job}
                />
              </div>
            </div>
          </div>
          <Separator className="my-5 bg-white/10" />
          <div className="h-auto w-full">
            <p className="text-lg font-medium mb-2 w-[30%]">&#62; SOCIAL</p>
            <div className="h-auto w-full flex flex-col items-center justify-center gap-3">
              <div className="flex w-full h-[2.5rem]">
                <p className="p-3 h-full w-[2.8rem] flex items-center justify-center text-2xl bg-white/10 border border-r-0 border-white/30 text-white/50">
                  <FaGithub />
                </p>
                <Input
                  className="h-full border-[.6px] border-white/40 focus-visible:ring-[2.5px] focus-within:border-[#849DFE] focus-visible:ring-[#131620] bg-white/5  rounded-sm "
                  placeholder="Enter your Github Profile Url"
                  value={user?.github}
                />
              </div>
              <div className="flex w-full h-[2.5rem]">
                <p className="p-3 h-full w-[2.8rem] flex items-center justify-center text-2xl bg-white/10 border border-r-0 border-white/30 text-white/50">
                  <FaXTwitter />
                </p>
                <Input
                  className="h-full border-[.6px] border-white/40 focus-visible:ring-[2.5px] focus-within:border-[#849DFE] focus-visible:ring-[#131620] bg-white/5  rounded-sm "
                  placeholder="Enter your X Profile Url"
                  value={user?.twitter}
                />
              </div>
              <div className="flex w-full h-[2.5rem]">
                <p className="p-3 h-full w-[2.8rem] flex items-center justify-center text-2xl bg-white/10 border border-r-0 border-white/30 text-white/50">
                  <FaLinkedinIn />
                </p>
                <Input
                  className="h-full border-[.6px] border-white/40 focus-visible:ring-[2.5px] focus-within:border-[#849DFE] focus-visible:ring-[#131620] bg-white/5  rounded-sm "
                  placeholder="Enter your LinkedIn Profile Url"
                  value={user?.linkedIn}
                />
              </div>
            </div>
          </div>
          <Separator className="my-5 bg-white/10" />
          <div className="h-auto w-full">
            <p className="text-lg font-medium mb-2 w-[30%]">&#62; INTERESTS</p>
            <div className="h-auto w-full gap-2 flex flex-wrap justify-start items-center">
              <Badge
                variant="outline"
                className="text-blue-500/70 border-blue-500/70 rounded-sm text-[1rem]"
              >
                Badge
              </Badge>
              <span className="h-7 flex justify-center items-center w-7 border-2 cursor-pointer border-blue-700/50">
                <Plus className="text-blue-700/50" />
              </span>
            </div>
          </div>
          <Separator className="my-5 bg-white/10" />
          <div className="w-full h-auto flex justify-end items-center">
            <Button className="text-[1.25rem]  rounded-none bg-blue-700/30">
              SAVE
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default EditProfile;
