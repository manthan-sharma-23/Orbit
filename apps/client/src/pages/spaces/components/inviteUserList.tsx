import Loading from "@/components/ui/Loading";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createInvite } from "@/features/funcs/invites/createInvite";
import { useGetUsers } from "@/features/hooks/users/useGetUsers";
import { spaceDetailsAtom } from "@/features/store/atoms/spaces/space.atom";
import UserInteract from "@/pages/global/pages/find_users/user_interact";
import { useState } from "react";
import { FaPaperclip } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { toast } from "sonner";
import { USER } from "typings";

const InviteUserList = () => {
  const space = useRecoilValue(spaceDetailsAtom);
  const { users, loading } = useGetUsers();

  if (!space.teams) {
    return;
  }

  const townHall =
    space.teams &&
    space.teams.find(
      (team) => team.name === "Townhall" || team.name === "townhall"
    );

  return (
    <div
      style={{ fontFamily: ' "Kode Mono", monospace' }}
      className="h-full w-full rounded-md flex justify-start flex-col gap-3 items-center p-4"
    >
      <p className="w-full font-semibold flex items-center text-lg">
        &#47;&#47;&#32;INVITE&#32;USER
      </p>
      <div className="mb-3 h-[40vh] w-full flex flex-col justify-start items-center ">
        {loading ? (
          <div className="h-full w-full">
            <Loading />
          </div>
        ) : (
          <ScrollArea className="h-full w-full flex flex-col px-5">
            {users.map((user) => (
              <div className="flex w-full h-[3.5rem] justify-between items-center mb-2 hover:bg-white/5 cursor-pointer">
                <Dialog>
                  <DialogTrigger className="h-full w-[70%]">
                    <div className="w-full h-full flex gap-3 justify-start items-center">
                      <img src={user.image} className="h-full rounded-md" />
                      <div className="h-full flex flex-col justify-center items-center text-white">
                        <p className="text-[1rem] text-white/60">{user.name}</p>
                        <p className="text-sm font-sans text-white/60 w-full flex justify-start items-center">
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
                  </DialogContent>
                </Dialog>
                <div className="flex justify-center items-center px-3">
                  <InviteUser user={user} teamId={townHall!.id} />
                </div>
              </div>
            ))}
          </ScrollArea>
        )}
      </div>
      <div className="h-auto w-full flex justify-center items-center gap-3">
        <Button className="h-auto flex hover:bg-none flex-col gap-1 rounded-full text-white/65 bg-inherit hover:bg-transparent">
          <FaPaperclip className=" text-xl h-9 w-9 p-2 rounded-full m-0 bg-white/5 hover:bg-white/10" />
          <p>Copy Link</p>
        </Button>
      </div>
    </div>
  );
};

const InviteUser = ({ user, teamId }: { user: USER; teamId: string }) => {
  const [loading, setLoading] = useState(false);
  const { spaceId } = useParams();

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
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <Button
      disabled={loading}
      onClick={handleInviteSend}
      className="rounded-md bg-white/90  w-[6rem] font-medium text-[.9rem] hover:bg-transparent hover:text-white text-black"
    >
      {loading ? <Loading /> : "Invite"}
    </Button>
  );
};

export default InviteUserList;
