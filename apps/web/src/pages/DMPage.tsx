import { BsInfoCircleFill } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";
import { IoCall } from "react-icons/io5";
import { LuFolderClosed } from "react-icons/lu";
import { useGetDmRoom } from "../features/hooks/dm-hooks/useGetDmRoom.hook";
import { useParams } from "react-router-dom";
import { TEXT } from "typings";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useListenWebSocket } from "../features/hooks/ws.hook";
import { sendMessageTo_WS_SERVER } from "../features/functions/ws/sendMessage.ws";
import { useRecoilValue } from "recoil";
import { userSelector } from "../features/store/selectors/user.selector";

const DMPage = () => {
  const { id, userId } = useParams();
  const [message, setMessage] = useState<string | null>(null);
  const { loading, dmRoom, setDmRoom } = useGetDmRoom(id!, userId!);
  const user = useRecoilValue(userSelector);

  const ws = useListenWebSocket(id!, setDmRoom)!;
  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      clickSend();
    }
  };

  const clickSend = () => {
    if (ws.readyState !== WebSocket.OPEN) alert("Server Overload");
    if (id && user.id && message && ws.readyState === WebSocket.OPEN) {
      sendMessageTo_WS_SERVER(ws, id, user.id, message);
      setMessage(null);
    } else {
      console.log("Please fill convention");
    }
  };

  if (loading) {
    return (
      <div className=" bg-black/10 text-white/15 flex justify-center items-center h-full w-full text-5xl font-bold">
        Loading....
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col text-white/65">
      <div className="h-[10%] border-b-2 border-white/50 flex shadow-md">
        <div className="h-full w-[15%] flex justify-center items-center px-5 py-4">
          <img
            className="h-[4.2rem] w-[4.2rem] rounded-full"
            src="https://openseauserdata.com/files/7c51390154b0e7dfec52c1e4e7b05299.png"
          />
        </div>
        <div className="h-full w-[65%] flex justify-start items-center text-3xl font-sans font-bold">
          {dmRoom.friend?.name}
        </div>
        <div className="h-full w-[25%] flex justify-end items-center gap-6 px-6 text-[1.5rem]">
          <BsInfoCircleFill className="cursor-pointer" />
          <IoCall className="cursor-pointer" />
          <LuFolderClosed className="cursor-pointer" />
        </div>
      </div>
      <div className="h-[90%] w-full text-black flex flex-col ">
        <div className="h-[90%] w-full ">
          <MessageContainer messages={dmRoom.MESSAGES} />
        </div>
        <div className=" h-[10%] w-full flex justify-center items-center gap-2 p-2">
          <div className="h-[5.3vh] w-[5.3vh] cursor-pointer flex items-center justify-center text-xl bg-gray-50 border-2 border-gray-300 rounded-full ">
            <GrAttachment className=" hover:scale-[1.1] transition-all" />
          </div>
          <input
            placeholder="Enter you message "
            value={message || ""}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleEnterPress}
            className="rounded-2xl px-2 focus:outline-none w-[65%] h-[5vh] border-gray-300 border-2"
          />
          <button
            onClick={() => {
              clickSend();
            }}
            className="bg-black text-white h-[2.9rem] rounded-xl font-sans font-medium hover:bg-white hover:text-black hover:border-black hover:border-2 transition-all text-lg w-[5rem] justify-center items-center flex"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

const MessageContainer = ({ messages = [] }: { messages?: TEXT[] }) => {
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        behavior: "smooth", // Add animation for smoother scrolling
      });
    }
  }, [messages]);
  return (
    <div
      ref={messageContainerRef}
      className="h-full w-full overflow-y-scroll  scrollc px-2 overflow-x-hidden"
    >
      {messages &&
        messages.map((text, index) => (
          <MessageBox
            key={index}
            text={text.text}
            sender={text.userId}
            time={text.sendAt}
          />
        ))}
    </div>
  );
};

const MessageBox = ({
  text,
  sender,
  time,
}: {
  text: string;
  sender: string;
  time?: Date;
}) => {
  const formattedTime = moment(time).format("h:mma");
  const { userId } = useParams();

  return (
    <div
      className={`mx-3 my-[3px] flex items-center justify-${sender === userId ? "start" : "end"} h-auto`}
    >
      <span
        className={`${sender === userId ? "bg-black/30" : "bg-black/70"} h-full text-white w-auto text-xl px-3 py-[1px] gap-2 rounded-lg cursor-pointer flex justify-between`}
      >
        <p className="h-auto w-auto py-2 ">{text}</p>
        <p className="text-[11px] h-auto  w-[3.5rem] font-extralight font-mono text-white/60 flex justify-end items-end  align-bottom">
          {formattedTime}
        </p>
      </span>
    </div>
  );
};

export default DMPage;
