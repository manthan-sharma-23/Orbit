import Loading from "@/components/ui/Loading";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { sendChatMessage } from "@/features/funcs/rooms/messages/sendChatMessage";
import { useChatWebSocket } from "@/features/hooks/WebSockets/chat/useChatWebSocket";
import { useGetRoomDetails } from "@/features/hooks/rooms/useGetRoomDetails";
import { RoomDetailsAtom } from "@/features/store/atoms/room/room.atom";
import { userAtom } from "@/features/store/atoms/user.atom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BiDotsVertical } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { MESSAGE, TEXT } from "typings";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import "@/lib/styles/scorllBar.css";
import { IoTrashOutline } from "react-icons/io5";
import { MdOutlineInfo } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserInteract from "../global/pages/find_users/user_interact";

const ChatMessages = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { roomId } = useParams();
  const { user } = useRecoilValue(userAtom);
  const ws = useChatWebSocket();
  const [message, setMessage] = useState<string | null>(null);
  const { friend, loading, _error } = useGetRoomDetails();
  const room = useRecoilValue(RoomDetailsAtom);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    // Scroll to the bottom when the component is loaded
    if (scrollRef.current && room.messages) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  useLayoutEffect(() => {
    scrollToBottom();
  }, [roomId]);

  useLayoutEffect(() => {
    scrollToBottom();
  }, [room.messages]);

  if (loading || ws === null || !roomId || !friend) {
    return (
      <div className="h-full w-full">
        <Loading />
      </div>
    );
  }

  if (_error) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        Some Error Occurred
      </div>
    );
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevents the default behavior of adding a new line
      handleSend(); // Call handleSendMessage when Enter key is pressed
    }
  };

  const handleSend = () => {
    if (message && user && user.id) {
      const time = new Date();
      const text: TEXT = {
        sendAt: time,
        userId: user.id,
        text: message,
      };
      const sendMessage: MESSAGE = {
        type: "MESSAGE",
        payload: {
          roomId,
          message: text,
        },
        timeStamp: time,
      };
      ws.send(JSON.stringify(sendMessage));
      setMessage(null);
      sendChatMessage({ roomId, message: text });
    }
  };

  return (
    <div className="text-white h-full w-full px-3">
      <div className="h-[10%] w-full bg-white/5 rounded-t-md flex justify-between items-center">
        <Dialog>
          <DialogTrigger className="h-full w-[80%]">
            <div className="h-full w-full">
              <div
                style={{ fontFamily: ' "Kode Mono", monospace' }}
                className="mb-2 rounded-l-md w-full h-full flex justify-start  items-center px-6 cursor-pointer gap-4"
              >
                <div className="overflow-hidden h-[3rem] rounded-full">
                  <img src={friend.image} className="bg-black h-full " />
                </div>
                <div className="gap-2 text-white/65 text-sm flex flex-col items-start justify-center h-full">
                  <p className="text-[1.3rem] text-white/80 font-semibold flex w-auto">
                    {friend.name}
                  </p>
                  <p>@{friend.username}</p>
                </div>
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
            <UserInteract userId={friend.id!} />
            <DialogHeader className="h-0 w-0"></DialogHeader>
            <DialogDescription className="h-0 w-0"></DialogDescription>
          </DialogContent>
        </Dialog>
        <div className="h-full w-[20%] flex justify-end px-6 text-3xl text-white/35 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <BiDotsVertical className="cursor-pointer focus:border-none focus-within:border-none focus-visible:border-none" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#0F0F0F] text-white/80 border-[1px] border-white/10">
              <DropdownMenuItem className="cursor-pointer text-blue-600 flex gap-3 text-[1rem]">
                <MdOutlineInfo /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-600 flex hover:text-red-600 gap-3 text-[1rem]">
                <IoTrashOutline />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="h-[70%] w-full  rounded-t-md py-1">
        <div
          className="relative h-full w-full overflow-y-scroll scroll_container bg-transparent px-5"
          ref={scrollRef}
        >
          {room.messages &&
            room.messages.map((message) => (
              <div
                className={`w-full min-h-[2.3rem] flex ${message.userId === user?.id ? "justify-end" : "justify-start"} items-center`}
              >
                <span
                  className={`h-full w-auto ${message.userId === user?.id ? " mb-[3px] bg-transparent border-[1px] border-white/10" : "mb-[2px] bg-white/10"} rounded-md text-[1.1rem] `}
                >
                  <p className="h-full w-auto mx-2 my-1 ">{message.text}</p>
                </span>
              </div>
            ))}
        </div>
      </div>
      <div className="h-[20%] w-full  rounded-b-md flex justify-center items-center ">
        <div className="w-[80%] h-full flex justify-center items-center flex-col gap-2">
          <Textarea
            onKeyDown={handleKeyDown}
            value={message || ""}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your Message"
            className="h-[60%] focus-within:ring-[3px] focus-within:border-blue-400/80 focus-within:ring-outset focus-within:ring-blue-800/80 font-sans font-normal text border-[1px] border-white/10 rounded-sm bg-white/5"
          />
          <div className="w-full h-[30%] flex justify-between items-center">
            <div></div>
            <div style={{ fontFamily: ' "Kode Mono", monospace' }}>
              <Button
                onClick={handleSend}
                className="text-[1.2rem] hover:bg-blue-800/35 bg-blue-800/20 rounded-sm border-[.5px] border-blue-400/50 ring-[1px] ring-blue-600/70"
              >
                SEND
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessages;
