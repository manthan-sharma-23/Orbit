import { ScrollArea } from "@/components/ui/scroll-area";
import { userFriendsAtom } from "@/features/store/atoms/friends/friends.atom";
import { userAtom } from "@/features/store/atoms/user.atom";
import { UsersAtom } from "@/features/store/atoms/users/users.atom";
import { FRIEND_REQUEST_STATUS } from "@/lib/types/type";

import { MdDone } from "react-icons/md";
import { useRecoilState, useRecoilValue } from "recoil";

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
import { acceptFriend } from "@/features/funcs/friends/acceptFriend";
import { rejectFriend } from "@/features/funcs/friends/rejectFriend";

const Pending = () => {
  const { user } = useRecoilValue(userAtom);

  const [friendRequests, setFriendRequests] = useRecoilState(userFriendsAtom);

  const requests = friendRequests.filter(
    (request) => request.status === FRIEND_REQUEST_STATUS.pending
  );
  const canAcceptRequests = requests.filter(
    (request) => request.receiverId === user?.id
  );

  const handleClick = (action: "accept" | "reject", requestId: string) => {
    if (action === "accept") {
      acceptFriend({ requestId }).then((data) => {
        if (data) setFriendRequests(data);
      });
    } else {
      rejectFriend({ requestId }).then((data) => {
        if (data) setFriendRequests(data);
      });
    }
  };

  if (!canAcceptRequests || canAcceptRequests.length <= 0) {
    return (
      <div
        style={{ fontFamily: ' "Kode Mono", monospace' }}
        className="h-full w-full flex flex-col gap-2 text-white/40 justify-center items-center"
      >
        <p>No Incomming Pending Requests for now</p>
        <p>Come back later</p>
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
          {canAcceptRequests.map((request) => (
            <div className="text-white h-[4rem] p-2 px-4 rounded-md bg-white/5 flex justify-between items-center">
              <User id={request.senderId} />
              <div className="flex gap-3 text-[1.7rem]">
                <RxCross2
                  className="border-2 rounded-md p-1 text-red-600/60 border-red-600/60 cursor-pointer"
                  onClick={() => handleClick("reject", request.id)}
                />
                <MdDone
                  className="border-2 rounded-md p-1  text-green-600/60 border-green-600/60 cursor-pointer"
                  onClick={() => handleClick("accept", request.id)}
                />
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
      <DialogTrigger className="w-[80%] h-full">
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

export default Pending;
