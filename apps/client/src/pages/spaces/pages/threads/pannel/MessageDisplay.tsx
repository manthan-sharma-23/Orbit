import { threadMessagesSelector } from "@/features/store/selectors/thread/threadMessages.selector";
import { useRecoilValue } from "recoil";
import { ScrollArea } from "@/components/ui/scroll-area";
import { userAtom } from "@/features/store/atoms/user.atom";
import Loading from "@/components/ui/Loading";
import { THREAD_MESSAGE_SCHEMA } from "typings";
import moment from "moment";
import { useEffect, useLayoutEffect, useRef } from "react";
import { extractBackgroundColor } from "@/lib/utils/rnad";

const MessageDisplay = () => {
  const user = useRecoilValue(userAtom);
  const messages = useRecoilValue(threadMessagesSelector);
  const MessagesBundle: THREAD_MESSAGE_SCHEMA[][] = groupMessages(messages);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth", // Add animation for smoother scrolling
      });
    }
  }, [messages]);

  if (user.loading || user.user?.id === undefined) {
    return (
      <div className="h-full w-full ">
        <Loading />
      </div>
    );
  }

  return (
    <div className="h-full w-full border-0 p-2 px-[2rem]">
      <div
        className="h-full w-full px-2 overflow-y-scroll scroll_container"
        ref={scrollRef}
      >
        {MessagesBundle.map((msgs, index) => (
          <MessageBundleTile key={index} messages={msgs} />
        ))}
      </div>
    </div>
  );
};

const MessageBundleTile = ({
  messages,
}: {
  messages: THREAD_MESSAGE_SCHEMA[];
}) => {
  const bundleInfo = {
    username: messages[0].User?.name,
    image: messages[0].User?.image,
    from: messages[0].userId,
  };

  const color = extractBackgroundColor(bundleInfo.image);
  const { user } = useRecoilValue(userAtom);

  const isMe = user?.id === bundleInfo.from;

  return (
    <div
      className={`h-auto w-full  mb-2 p-2 flex items-start justify-start ${isMe && "flex-row-reverse "} border-0`}
    >
      <div className="flex flex-col justify-start  h-full w-auto mx-2 ">
        {bundleInfo.image ? (
          <img
            src={bundleInfo.image}
            alt="User Image"
            className="h-8 w-8 rounded-full mx-1"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center mx-1">
            <span className="text-white">
              {bundleInfo.username?.split("")[0]}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col w-auto  ">
        <span
          style={{ color: color || "#000000" }}
          className={`font-medium mb-1 text-[.9rem] tracking-wide  ${isMe ? "text-right mr-1" : "text-left ml-1 "} `}
        >
          {isMe ? "You" : bundleInfo.username}
        </span>
        {messages.map((message, index) => (
          <MessageTile key={index} message={message} isMe={isMe} />
        ))}
      </div>
    </div>
  );
};

const MessageTile = ({
  message,
  isMe,
}: {
  message: THREAD_MESSAGE_SCHEMA;
  isMe: boolean;
}) => {
  const time = moment(message.timeStamp).format("LT");
  return (
    <div className={`flex flex-col ${isMe ? "items-end" : "items-start"} mb-1`}>
      <div
        className={`${
          isMe
            ? "bg-[#f0f0f1] text-black rounded-tl-lg rounded-br-lg rounded-bl-lg"
            : "bg-black text-white rounded-tr-lg rounded-bl-lg rounded-br-lg border border-white/20"
        } font-medium px-2 py-1`}
      >
        <p className="mb-1 pr-3">{message.data}</p>
        <p className={`text-xs   flex ${isMe?"justify-end text-black/45":"justify-start text-white/45"}`}>{time}</p>
      </div>
    </div>
  );
};

const groupMessages = (messages: THREAD_MESSAGE_SCHEMA[]) => {
  const groupedMessages = [];
  let currentGroup: THREAD_MESSAGE_SCHEMA[] = [];

  messages.forEach((msg, index) => {
    if (
      index === 0 ||
      msg.userId !== messages[index - 1].userId ||
      isTimeGapExceeded(messages[index - 1], msg)
    ) {
      if (currentGroup.length > 0) {
        groupedMessages.push(currentGroup);
      }
      currentGroup = [msg];
    } else {
      currentGroup.push(msg);
    }
  });

  if (currentGroup.length > 0) {
    groupedMessages.push(currentGroup);
  }

  return groupedMessages;
};

const isTimeGapExceeded = (
  prevMessage: THREAD_MESSAGE_SCHEMA,
  nextMessage: THREAD_MESSAGE_SCHEMA
) => {
  const prevMessageTime = new Date(prevMessage.timeStamp).getTime();
  const nextMessageTime = new Date(nextMessage.timeStamp).getTime();
  const timeGap = (nextMessageTime - prevMessageTime) / (1000 * 60); // Calculate time gap in minutes
  return timeGap > 10;
};

export default MessageDisplay;
