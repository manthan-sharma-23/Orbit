import { threadMessagesSelector } from "@/features/store/selectors/thread/threadMessages.selector";
import { useRecoilValue } from "recoil";
import { ScrollArea } from "@/components/ui/scroll-area";
import { userAtom } from "@/features/store/atoms/user.atom";
import Loading from "@/components/ui/Loading";
import { THREAD_MESSAGE_SCHEMA } from "typings";
import { UserBaseDetailSelector } from "@/features/store/selectors/user/userBase.Selector";
import moment from "moment";

const ThreadMessages = () => {
  const user = useRecoilValue(userAtom);
  const messages = useRecoilValue(threadMessagesSelector);
  const MessagesBundle: THREAD_MESSAGE_SCHEMA[][] = groupMessages(messages);

  console.log(MessagesBundle);
  if (user.loading || user.user?.id === undefined) {
    return (
      <div className="h-full w-full ">
        <Loading />
      </div>
    );
  }

  return (
    <div className="h-full w-full border-0 p-2 px-12">
      <ScrollArea className="h-full w-full px-2">
        {MessagesBundle.map((msgs, index) => (
          <MessageBundleTile key={index} messages={msgs} />
        ))}
      </ScrollArea>
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
  const { user } = useRecoilValue(userAtom);

  const isMe = user?.id === bundleInfo.from;

  console.log(messages);

  console.log(isMe);

  return (
    <div
      className={`h-auto w-full  mb-2 p-2 flex items-start ${isMe && "flex-row-reverse justify-start"} border-0`}
    >
      <div className="flex flex-col justify-start  h-full w-auto mx-2">
        {bundleInfo.image ? (
          <img
            src={bundleInfo.image}
            alt="User Image"
            className="h-8 w-8 rounded-full mr-2"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center mr-2">
            <span className="text-white">
              {bundleInfo.username?.split("")[0]}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col w-auto ">
        <span className="font-medium text-black/40  text-right ">
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
    <div className="h-auto w-full bg-black text-white px-3 py-1 rounded mb-[1px]">
      <div className="min-w-[7rem] h-auto flex flex-col">
        <p className="h-auto w-auto">{message.data}</p>
        <p className="h-[2rem] w-auto text-xs flex justify-end items-end text-white/80">
          {time}
        </p>
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

export default ThreadMessages;
