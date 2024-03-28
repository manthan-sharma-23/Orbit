import { ScrollArea } from "@/components/ui/scroll-area";
import { userFriendsAtom } from "@/features/store/atoms/friends/friends.atom";
import { userAtom } from "@/features/store/atoms/user.atom";
import { UsersAtom } from "@/features/store/atoms/users/users.atom";
import { FRIEND_REQUEST_STATUS } from "@/lib/types/type";

import { MdDone } from "react-icons/md";
import { useRecoilState, useRecoilValue } from "recoil";
import { CiTimer } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserInteract from "../../pages/find_users/user_interact";
import moment from "moment";
import { timeAgo } from "../../../../lib/utils/rnad";

const SentRequests = () => {
  const { user } = useRecoilValue(userAtom);

  const friendRequests = useRecoilValue(userFriendsAtom);

  const requests = friendRequests.filter(
    (request) => request.status === FRIEND_REQUEST_STATUS.pending
  );
  const pendingRequests = requests.filter(
    (request) => request.senderId === user?.id
  );

  if (!pendingRequests || pendingRequests.length <= 0) {
    return (
      <div
        style={{ fontFamily: ' "Kode Mono", monospace' }}
        className="h-full w-full flex flex-col gap-2 text-white/40 justify-center items-center"
      >
        <p>No Pending Requests you have sent</p>
      </div>
    );
  }
  return (
    <div
      className="h-full w-full  py-3 px-2"
      style={{ fontFamily: ' "Kode Mono", monospace' }}
    >
      <ScrollArea className="h-full w-full">
        <div className="h-full w-full flex flex-col gap-2">
          {pendingRequests.map((request) => (
            <div className="text-white h-[4rem] p-2 px-4 rounded-md bg-white/5 flex justify-between items-center">
              <User id={request.receiverId} />
              <div className="w-auto flex gap-3 text-[.9rem] justify-center items-center">
                <p className="text-white/60">
                  Sent {moment(request.createdAt).fromNow()}
                </p>
                <CiTimer className="text-white/60 text-[1.3rem]" />
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

const User = ({ id }: { id: string }) => {
  const users = useRecoilValue(UsersAtom);

  const user = users.find((user) => user.id === id);
  return (
    <Dialog>
      <DialogTrigger className="w-[65%] h-full">
        <div className="flex gap-2 justify-start items-center cursor-pointer w-full">
          <Avatar>
            <AvatarImage src={user?.image} className="bg-black" />
          </Avatar>
          <div className="flex items-center justify-start text-white/50 mx-3 gap-3">
            <p className="text-white/80 text-lg font-semibold">{user?.name}</p>
            <p className="hover:underline">@{user?.username}</p>
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
        <UserInteract user={user!} />
        <DialogHeader className="h-0 w-0"></DialogHeader>
        <DialogDescription className="h-0 w-0"></DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default SentRequests;
