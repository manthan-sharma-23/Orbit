import Input from "../components/interface/Input";
import Button from "../components/interface/Button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MESSAGE } from "typings";
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from "../features/store/rtk-query/message.api";

const Chat = () => {
  const { id } = useParams();
  const [sendMessage] = useSendMessageMutation();
  const { data, isLoading } = useGetMessagesQuery({ roomId: id! });
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    console.log(data);
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
          setMessages((prev) => [
            ...prev,
            text.payload.message as unknown as string,
          ]);
        }
      });
    };

    return () => {
      if (wsInstance) {
        wsInstance.close();
      }
    };
  }, []);

  const sendMessages = () => {
    if (id && message && ws && ws.readyState === WebSocket.OPEN) {
      try {
        const text: MESSAGE = {
          type: "MESSAGE",
          payload: {
            roomId: id,
            message,
          },
        };
        ws.send(JSON.stringify(text));
        sendMessage({ message, roomId: id });

        setMessage(null);
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (isLoading) {
    return <div className=" text-black text-2xl">Loading...</div>;
  }

  // if (isError) {
  //   return <div>Error</div>;
  // }

  return (
    <div className="h-full w-full flex flex-col justify-center items-center rounded-xl shadow">
      <div className="w-full h-[94%] bg-white rounded-xl border-[1px] border-black my-2 shadow-lg">
        {messages.map((msg) => (
          <MessageDialouge text={msg} />
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
};

const MessageDialouge = ({ text }: { text?: string }) => {
  return (
    <div className="mx-3 my-4">
      <span className="bg-black/80 text-white w-auto text-xl p-2 rounded-lg">
        {text}
      </span>
    </div>
  );
};

export default Chat;
