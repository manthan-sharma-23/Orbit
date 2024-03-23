import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import {
  AtSign,
  Bold,
  ChevronDown,
  Code,
  Italic,
  Mic,
  Paperclip,
  SendHorizontal,
  SmilePlus,
  Underline,
  Video,
} from "lucide-react";

const chatMessageIcons = [
  <AtSign />,
  <SmilePlus />,
  <Paperclip />,
  <Mic />,
  <Video />,
  <Code />,
  <Bold />,
  <Italic />,
  <Underline />,
];

const ChatTextArea = ({
  onChange,
  value,
  handleSendMessage,
}: {
  onChange: Function;
  value: string | null;
  handleSendMessage: () => void;
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents the default behavior of adding a new line
      handleSendMessage(); // Call handleSendMessage when Enter key is pressed
    }
  };
  return (
    <div className="h-full w-full bg-white flex flex-col border-[1px] border-black/80  rounded-md relative z-20">
      <Textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="h-[70%] w-full bg-white border-0 text-md focus:outline-none font-medium"
        placeholder="Enter your Message"
        onKeyDown={handleKeyDown}
      />
      <Separator className="bg-black/70" />
      <div className="h-[30%] w-full flex">
        <div className="w-[80%] h-full flex gap-2 justify-start items-center px-2">
          {chatMessageIcons.map((icon, index) => (
            <>
              <div
                className="h-[2.5rem] cursor-pointer w-[2.5rem] hover:bg-black/15 rounded-md flex justify-center items-center"
                key={index}
              >
                <section className=" text-sm  h-[1.3rem] w-[1.3rem] flex justify-center items-center rounded-md">
                  {icon}
                </section>
              </div>
              {index === 4 && (
                <Separator orientation="vertical" className="bg-black/70" />
              )}
            </>
          ))}
        </div>
        <div className="w-[20%] flex justify-end items-center pr-1">
          <Button className="m-1 bg-black text-white font-medium onClick={handleSendMessage}">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatTextArea;
