import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { addMessageToThread } from "@/features/funcs/threads/addMessageToThread";
import { useThreadWebSocket } from "@/features/hooks/WebSockets/threads/useThreadWebSocket";
import { threadAtom } from "@/features/store/atoms/thread/thread.atom";
import { userAtom } from "@/features/store/atoms/user.atom";
import _ from "lodash";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { MESSAGE, THREAD_MESSAGE_SCHEMA, USER } from "typings";
import MessageDisplay from "./MessageDisplay";

const Chat = () => {
  const thread = useRecoilValue(threadAtom);
  const [message, setMessage] = useState("");
  const ws = useThreadWebSocket();
  const { user } = useRecoilValue(userAtom);

  const sendMessageToThread = ({
    ws,
    threadMessage,
    user,
  }: {
    ws: WebSocket | null;
    threadMessage: THREAD_MESSAGE_SCHEMA;
    user: Partial<USER>;
  }) => {
    try {
      if (ws) {
        const signal: MESSAGE = {
          type: "MESSAGE",
          timeStamp: threadMessage.timeStamp!,
          payload: {
            roomId: threadMessage.threadId,
            threadMessage: { id: -1, ...threadMessage, User: user },
          },
        };

        ws.send(JSON.stringify(signal));

        addMessageToThread({
          text: threadMessage.data!,
          threadId: threadMessage.threadId!,
          type: "chat",
          timeStamp: threadMessage.timeStamp,
        });

        return true;
      } else {
        throw Error;
      }
    } catch (error) {
      return false;
    }
  };

  const handleSend = () => {
    const threadMessage: THREAD_MESSAGE_SCHEMA = {
      isActive: true,
      data: message,
      threadId: thread.id,
      userId: user!.id!,
      timeStamp: new Date(),
    };
    sendMessageToThread({ ws, threadMessage, user: user! });
    setMessage("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevents the default behavior of adding a new line
      handleSend(); // Call handleSendMessage when Enter key is pressed
    }
  };

  return (
    <div className="h-full w-full bg-black rounded-lg flex flex-col justify-center items-center overflow-hidden border border-blue-400/35">
      <div className="h-[7%] w-full bg-white/5 opacity-100  flex justify-between text-white items-center  text-xl font-semibold px-3">
        &#35;&#32;{_.upperFirst(thread?.name)}
      </div>
      <div className="h-[73%] w-[60vw] ">
        <MessageDisplay />
      </div>
      <div className="h-[20%] w-full flex justify-center items-center">
        <div className="w-[80%] h-auto flex justify-center items-center flex-col bg-white/5">
          <Textarea
            onKeyDown={handleKeyDown}
            value={message || ""}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your Message"
            className="h-[5rem] focus-within:ring-[3px] focus-within:border-blue-400/80 focus-within:ring-outset focus-within:ring-blue-800/80 font-sans font-normal text border-[1px] border-white/10 rounded-sm bg-white/5"
          />

          <div
            style={{ fontFamily: ' "Kode Mono", monospace' }}
            className="h-auto w-full flex justify-end items-center p-1"
          >
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
  );
};

export default Chat;
