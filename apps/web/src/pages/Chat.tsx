import Input from "../components/interface/Input";
import Button from "../components/interface/Button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MESSAGE, TEXT } from "typings";
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from "../features/store/rtk-query/message.api";
import { useGetUserQuery } from "../features/store/rtk-query/user.api";

export default function Chat() {
  const { id } = useParams();
  const [sendMessage] = useSendMessageMutation();
  const user = useGetUserQuery();
  const { data, isLoading } = useGetMessagesQuery({ roomId: id! });
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [messages, setMessages] = useState<TEXT[]>([]);

  useEffect(() => {
    const wsInstance = new WebSocket("ws://localhost:3100");

    wsInstance.onopen = () => {
      setWs(wsInstance);

      wsInstance.send(
        JSON.stringify({
          type: "JOIN",
          payload: {
            roomId: id,
          },
        })
      );

      wsInstance.addEventListener("message", (msg) => {
        const text: MESSAGE = JSON.parse(msg.data);
        if (text.type === "MESSAGE" && text.payload.message) {
          console.log(text);
          const newMessage: TEXT = {
            sendAt: text.payload.message.sendAt,
            userId: text.payload.message.userId,
            text: text.payload.message.text,
          };
          setMessages((prev) => [...prev, newMessage]);
        }
      });
    };

    setMessages(data!);

    return () => {
      if (wsInstance) {
        wsInstance.close();
      }
    };
  }, []);

  const sendMessages = () => {
    if (user.data && id && message && ws && ws.readyState === WebSocket.OPEN) {
      const msg: TEXT = {
        sendAt: new Date(),
        userId: user.data.user.id!,
        text: message,
      };
      try {
        const text: MESSAGE = {
          type: "MESSAGE",
          payload: {
            roomId: id,
            message: msg,
          },
        };
        ws.send(JSON.stringify(text));
        sendMessage({ message: msg, roomId: id });

        setMessage(null);
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (isLoading) {
    return <div className=" text-black text-2xl">Loading...</div>;
  }

  return (
    <div className="h-full w-full flex flex-col justify-center items-center rounded-xl shadow">
      <div className="w-full h-[94%] bg-white rounded-xl border-[1px] border-black my-2 shadow-lg overflow-y-scroll">
        {messages.map((msg, index) => (
          <MessageDialouge
            text={msg.text}
            key={index}
            userId={user.data?.user.id}
            senderId={msg.userId}
          />
        ))}
      </div>
      <div className="w-full h-[6%] rounded-2xl flex justify-center items-center bg-transparent">
        <div className="w-[90%] h-full flex items-center justify-center shadow-md">
          <Input
            backgroundColor="#dbdbdbec"
            borderColor="black"
            placeholder={id}
            showPlaceholder={true}
            value={message || ""}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </div>
        <div className="w-[10%] h-full flex justify-center items-center px-2">
          <Button text="Send" onClick={sendMessages} />
        </div>
      </div>
    </div>
  );
}

const MessageDialouge = ({
  senderId,
  text,
  userId,
}: {
  text?: string;
  userId?: string;
  senderId?: string;
}) => {
  return (
    <div
      className={`mx-3 my-2 flex items-center justify-${userId === senderId ? "end" : "start"}`}
    >
      <span className="bg-black/80 text-white w-auto text-xl px-3 py-2 rounded-lg">
        {text}
      </span>
    </div>
  );
};
