import "../styles/scroll.css";

import Input from "../components/interface/Input";
import Button from "../components/interface/Button";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { MESSAGE, TEXT } from "typings";
import { useSendMessageMutation } from "../features/store/rtk-query/message.api";
import { useGetUserQuery } from "../features/store/rtk-query/user.api";
import { SERVER_URL } from "../utils/constants/config";

export default function Chat() {
  const { id } = useParams();
  const [sendMessage] = useSendMessageMutation();
  const user = useGetUserQuery();
  // const { data, isLoading } = useGetMessagesQuery({ roomId: id! });
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

        console.log(text);
        if (text.type === "MESSAGE" && text.payload.message) {
          const newMessage: TEXT = {
            sendAt: text.payload.message.sendAt,
            userId: text.payload.message.userId,
            text: text.payload.message.text,
          };
          setMessages((prev) => [...prev, newMessage]);
        }
      });
    };

    fetch(SERVER_URL + "/api/messages/getmessages/" + id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data: TEXT[]) => {
        setMessages(data);
      })
      .catch((err) => {
        console.log(err);
      });

    wsInstance.onclose = () => {
      console.log("Connection closed");
    };

    return () => {
      if (wsInstance) {
        wsInstance.close();
      }
    };
  });

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

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessages();
    }
  };

  if (!user.data || !user.data.user.id) {
    return <div className=" text-black text-2xl h-full w-full">Loading...</div>;
  }

  return (
    <div className="h-full w-full flex flex-col justify-center items-center rounded-xl shadow">
      {messages && (
        <MessageContainer messages={messages} userId={user.data.user.id} />
      )}
      <div className="w-full h-[6%] rounded-2xl flex justify-center items-center bg-transparent">
        <div className="w-[90%] h-full flex items-center justify-center shadow-md">
          <Input
            backgroundColor="#dbdbdbec"
            borderColor="black"
            placeholder={"Enter the message you want to send"}
            showPlaceholder={true}
            value={message || ""}
            onKeyDown={handleEnterPress}
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

const MessageContainer = ({
  messages,
  userId,
}: {
  messages: TEXT[];
  userId: string;
}) => {
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
      className="w-full h-[94%] bg-white rounded-xl border-[1px] overflow-x-hidden border-black my-2 shadow-lg overflow-y-scroll scrollc "
    >
      {messages &&
        messages.map((msg, index) => (
          <MessageDialouge
            text={msg.text}
            key={index}
            userId={userId}
            senderId={msg.userId}
          />
        ))}
    </div>
  );
};

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
      className={`mx-3 my-[3px] flex items-center justify-${userId === senderId ? "end" : "start"}`}
    >
      <span className="bg-black/80 text-white w-auto text-xl px-3 py-2 rounded-lg">
        {text}
      </span>
    </div>
  );
};
