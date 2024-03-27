import Loading from "@/components/ui/Loading";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getARoom } from "@/features/funcs/rooms/messages/getARoom";
import _ from "lodash";
import React, { useState } from "react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineWork } from "react-icons/md";
import { SlGlobe } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import { USER } from "typings";

const UserInteract = ({ user }: { user: USER }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleMessageTab = () => {
    if (user.id) {
      setLoading(true);
      getARoom({ friendId: user.id })
        .then((data) => {
          navigate(`/home/chat/${data?.id}`);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  return (
    <div className="h-[90vh] w-full  p-2 px-4 flex flex-col">
      <div className="px-1 h-[20%] w-full  mt-8 flex justify-between flex-row-reverse items-center gap-3">
        <div className="p-1 h-[70%] w-auto border-white/20  bg-transparent border">
          <img src={user.image} className="h-full bg-black" />
        </div>
        <div className="overflow-hidden h-[70%] w-auto flex flex-col justify-between gap-2 items-start text-white/60">
          <p className="font-bold text-white/85 text-2xl">
            &#47;&#47; {_.upperCase(user.name)}
          </p>
          <div className="flex w-full gap-6 justify-start items-center">
            <p className="text-sm tracking-wide">{user.email}</p>
            <p className="text-sm tracking-wide">@{user.username}</p>
          </div>
          <div className="flex gap-5 h-full text-[.9rem]">
            <div className="flex text-white/60 items-center gap-2">
              <IoLocationSharp />
              <p>{user?.country}</p>
            </div>
            <div className="flex text-white/60 items-center gap-2">
              <MdOutlineWork />
              <p>{user?.job}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-auto w-auto my-1 flex gap-3">
        <Button
          disabled={loading}
          onClick={handleMessageTab}
          className="hover:text-white/90 hover:bg-transparent bg-white/80 w-1/2 text-[1.2rem] text-black flex justify-center items-center"
        >
          {loading ? <Loading /> : "MESSAGE"}
        </Button>
        <Button className="hover:text-white/90 hover:bg-transparent bg-white/80 w-1/2 text-[1.2rem] text-black flex justify-center items-center">
          ADD FRIEND
        </Button>
      </div>
      <Separator className="my-1 bg-white/10" />
      <div className="h-[75%] w-full py-2 pt-5">
        <ScrollArea className="h-full w-full text-sm">
          <ScrollBar className="w-[1px]" />
          <div className="mb-3">
            <p className="mb-1">&#62; ABOUT ME</p>
            <div className="h-[8rem] px-1 border-white/30 rounded-sm w-full border flex justify-center items-center">
              <div className="h-[7.5rem] w-full border-white/10 rounded-sm border p-2 font-sans text-[1rem] overflow-hidden">
                {user.about ? user.about : "No about by this user"}
              </div>
            </div>
          </div>
          {user.skills.length > 0 && (
            <div className="mb-3">
              <p className="mb-1">&#62; SKILLSET</p>
              <div className="min-h-[8rem] px-1 border-blue-600/45 bg-[#161925] rounded-sm w-full border flex justify-center items-center">
                <div className="min-h-[7.5rem] p-3 gap-3 flex flex-wrap w-full bg-transparent border border-white/10 rounded-sm font-sans text-[1rem] overflow-hidden">
                  {user.skills.map((skill, index) => (
                    <p
                      key={index}
                      className="cursor-pointer px-2 py-1 text-white/80 border-blue-400/80 border-[1px] h-[2rem]  tracking-wide w-auto rounded-md"
                    >
                      {skill}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
          {user.roles.length > 0 && (
            <div className="mb-3">
              <p className="mb-1">&#62; ROLES INTERESTED IN</p>
              <div className="min-h-[7rem] px-1 border-white/30  rounded-sm w-full border flex justify-center items-center">
                <div className="min-h-[6.5rem] p-3 gap-3 flex flex-wrap w-full bg-transparent border border-white/10 rounded-sm font-sans text-[1rem] overflow-hidden">
                  {user.roles.map((role, index) => (
                    <p
                      key={index}
                      className="cursor-pointer px-2 py-1 text-white/80 border-white/40 border-[1px] h-[2rem]  tracking-wide w-auto rounded-md"
                    >
                      {role}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="mb-3 h-auto">
            <p className="mb-1">&#62; WORK</p>
            <div className="pl-5 pt-2 flex flex-col items-start justify-start gap-2 text-white/70">
              <p className="flex gap-2">
                I am a <p className="underline">{user.stage}</p>
              </p>
              <p>Work Experience : {user.workEx} years</p>
              <p className="flex justify-start items-center gap-2">
                Communicating Languages:{" "}
                {user.languages.map((lang) => (
                  <p>{lang}</p>
                ))}
              </p>
            </div>
          </div>
          <Separator className="my-1 bg-white/10" />
          <div className="mb-3 mt-3 h-auto">
            <div className="pl-5 pt-2 flex flex-col items-start justify-start gap-2 text-white/70">
              <div className="h-full  flex justify-center items-center text-2xl text-white/70 gap-6  w-full">
                {user?.github && (
                  <Link to={user?.github}>
                    <FaGithub />
                  </Link>
                )}
                {user?.twitter && (
                  <Link to={user?.twitter || ""}>
                    <FaXTwitter />
                  </Link>
                )}
                {user?.linkedIn && (
                  <Link to={user?.linkedIn || ""}>
                    <FaLinkedinIn />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
export default UserInteract;
