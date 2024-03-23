import ChatTextArea from "@/components/elements/ChatTextArea";
import Loading from "@/components/ui/Loading";
import { Separator } from "@/components/ui/separator";
import { TypographyH2 } from "@/components/ui/typography/h2";
import { sendMessageToThread } from "@/features/hooks/WebSockets/sendMessageToThread";
import { useWebSocket } from "@/features/hooks/WebSockets/useWebSocket";
import { useGetThreadInfo } from "@/features/hooks/threads/useGetThreadInfo";
import { userAtom } from "@/features/store/atoms/user.atom";
import _ from "lodash";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import ThreadMessages from "./threadMessages";
import { THREAD_MESSAGE_SCHEMA } from "typings";
import { UserBaseDetailSelector } from "@/features/store/selectors/user/userBase.Selector";

export const Thread = () => {
  const { loading, thread } = useGetThreadInfo();
  const [message, setMessage] = useState<string | null>(null);
  const webSocket = useWebSocket();
  const user = useRecoilValue(userAtom);
  const userBase = useRecoilValue(UserBaseDetailSelector);
  if (loading || webSocket === null || !user.user || !user.user?.id) {
    return (
      <div className="h-full w-full">
        <Loading />
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!message || !user.user || !user.user.id) return;
    const threadMessage: THREAD_MESSAGE_SCHEMA = {
      type: "chat",
      isActive: true,
      threadId: thread.id,
      data: message,
      userId: user.user?.id,
      timeStamp: new Date(),
    };
    sendMessageToThread({
      ws: webSocket,
      threadMessage,
      user: userBase,
    });

    setMessage(null);
  };

  return (
    <span className="h-full w-full p-0 flex flex-col">
      <div className="w-full h-[8vh] flex items-center p-2">
        <TypographyH2 text={_.upperFirst(thread.name)} className="ml-1" />
      </div>
      <Separator className="bg-black/10" />
      <div className="w-full h-[92vh]   flex flex-col">
        <div className="h-[80%] w-full">
          <ThreadMessages />
        </div>
        <div className="h-[20%] w-full  bg-transparent flex justify-center items-center ">
          <div className="w-[0%] h-full rounded-md p-[2.5px] bg-black/50 ">
            <ChatTextArea
              onChange={(newValue: string) => setMessage(newValue)}
              value={message}
              handleSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </span>
  );
};
