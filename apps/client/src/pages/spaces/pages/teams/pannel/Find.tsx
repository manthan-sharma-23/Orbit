import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { IoIosGlobe, IoIosOptions } from "react-icons/io";
import { IoLocationSharp, IoSearchOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdOutlineWork } from "react-icons/md";
import UserInteract from "@/pages/global/pages/find_users/user_interact";
import { useGetUsers } from "@/features/hooks/users/useGetUsers";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/features/store/atoms/user.atom";
import Loading from "@/components/ui/Loading";
import { Button } from "@/components/ui/button";
import { useGetTeamInvitesSentByTeam } from "@/features/hooks/invites/useGetInvitesSendByTeam";
import { USER } from "typings";
import { useParams } from "react-router-dom";
import { createInvite } from "@/features/funcs/invites/createInvite";
import { toast } from "sonner";

const Find = () => {
  const { loading, users } = useGetUsers();
  const { user } = useRecoilValue(userAtom);
  const myId = user?.id;
  const { invites } = useGetTeamInvitesSentByTeam();

  if (loading) {
    return (
      <div className="h-full w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="h-full w-full p-2 flex justify-start items-center">
      <div className="w-[70%] h-full">
        <div className="bg-white/10 h-10 rounded-sm mt-4 w-full font-mono flex justify-start items-center px-4 text-lg text-white/70 gap-2">
          <span className="h-full flex justify-center items-center">
            <IoSearchOutline />
          </span>
          <p
            className="top-[1px] relative flex gap-3 justify-between  w-full"
            style={{ fontFamily: ' "Kode Mono", monospace' }}
          >
            SEARCH FOR MATES
            <p className="relative text-white/10 ml-3 ">
              ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
            </p>
          </p>
        </div>
        <div className="flex justify-center items-center my-2 h-10 gap-3">
          <Input
            className="w-full h-full border-[.6px] border-white/45 focus-visible:ring-[2.5px] focus-within:border-[#849DFE] focus-visible:ring-[#131620] bg-white/5  rounded-sm "
            placeholder="Search by Role or Username"
          />
          <DropdownMenu>
            <DropdownMenuTrigger className="h-full w-auto">
              <div className="h-full w-10 border-[1px] bg-[#131620]  cursor-pointer text-lg flex justify-center items-center border-white/45 ring-[2.5px] border-[#849DFE] ring-[#131620]">
                <IoIosOptions className="text-2xl text-[#849DFE]" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-h-[30vh] w-[17vw]  border-0">
              <DropdownMenuLabel className="text-lg">
                Filter Users
              </DropdownMenuLabel>
              <div className="flex flex-col  justify-start items-center h-full w-full my-2 px-2">
                <div className="flex items-center w-full space-x-2">
                  <Switch id="airplane-mode" className="bg-black" />
                  <Label htmlFor="airplane-mode">Friends</Label>
                </div>
                <Select>
                  <Label>Select By Job</Label>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <ScrollArea className="h-full w-full">
          <div className="h-auto w-full flex flex-wrap justify-between  p-0  ">
            {users &&
              users.map(
                (user, index) =>
                  user.id !== myId && <User user={user} key={index} />
              )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

const User = ({ user }: { user: USER }) => {
  const { invites, setInvites } = useGetTeamInvitesSentByTeam();

  const [loading, setLoading] = useState(false);
  const { spaceId, teamId } = useParams();

  const isInvited = invites.find((invite) => invite.to === user.id);

  if (isInvited?.status === true || !teamId) {
    return;
  }

  const handleInviteSend = () => {
    setLoading(true);
    createInvite({ to: user.id!, spaceId: spaceId!, teamId })
      .then((data) => {
        setLoading(false);
        toast("Invite Sent", {
          style: {
            fontSize: "1rem",
          },
        });
        if (data) setInvites((v) => [...v, data]);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  return (
    <Dialog>
      <div className="w-[49%] h-[23vh] mb-4 relative">
        <div className="w-full h-full border-[1px] border-white/15 my-2 p-1 hover:border-white/70 cursor-pointer">
          <div className="h-full w-full border-[1px] p-1 border-white/10">
            <DialogTrigger className="w-full">
              <div className="h-[35%] w-full bg-white/5 flex gap-2">
                <div className="h-full w-[4.3rem]">
                  <img src={user.image} className="bg-black h-full w-full" />
                </div>
                <div className="flex flex-col items-start justify-center gap-2 text-white/70">
                  <p
                    style={{
                      fontFamily: ' "Kode Mono", monospace',
                    }}
                  >
                    {user.name}
                  </p>
                  <p className="hover:underline hover:text-white/80">
                    @{user.username}
                  </p>
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
              <UserInteract userId={user!.id!} />
              <DialogHeader className="h-0 w-0"></DialogHeader>
              <DialogDescription className="h-0 w-0"></DialogDescription>
            </DialogContent>

            <div className="h-[60%] flex flex-col justify-evenly items-start w-full my-2">
              <div className="w-full h-[2.5rem] overflow-hidden flex justify-start gap-2 items-center">
                {user.roles.slice(0, 2).map((role, index) => (
                  <span
                    key={index}
                    style={{
                      fontFamily: '"Kode Mono", monospace',
                    }}
                    className="border-[1px] border-blue-600/50 text-xs bg-[#2E2E2E] text-white/90 w-auto rounded-sm px-2 py-2"
                  >
                    {role}
                  </span>
                ))}
                {user.roles.length > 2 && (
                  <p
                    style={{
                      fontFamily: '"Kode Mono", monospace',
                    }}
                  >
                    +{user.roles.length - 2}
                  </p>
                )}
              </div>
              <div className="mt-3 flex justify-start items-start gap-1 w-full ">
                <div className="w-1/2 h-full flex flex-col gap-1 p-1">
                  <p className="flex w-full overflow-hidden text-sm text-white/60 gap-1">
                    <MdOutlineWork className="relative top-[1px]" />
                    {user.job}
                  </p>
                  <p className="flex w-full text-sm text-white/60 gap-1 overflow-hidden">
                    <IoIosGlobe className="relative top-[1px]" />
                    {user.languages.map((lang) => (
                      <p>{lang}</p>
                    ))}
                  </p>
                  <p className="flex w-full overflow-hidden text-sm text-white/60 gap-1">
                    <IoLocationSharp className="relative top-[1px]" />
                    {user.country}
                  </p>
                </div>
                <div className="w-1/2 h-full flex justify-end items-end px-1 pb-2">
                  <Button
                    disabled={
                      (isInvited?.status === false &&
                        isInvited.isRejected === false) ||
                      loading ||
                      false
                    }
                    onClick={handleInviteSend}
                    className="bg-white text-black hover:bg-transparent hover:text-white"
                  >
                    {loading ? (
                      <Loading />
                    ) : isInvited?.status === false &&
                      isInvited.isRejected === false ? (
                      "Invited"
                    ) : (
                      "Invite"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default Find;
