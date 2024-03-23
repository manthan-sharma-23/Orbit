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
  return (
    <div className="h-full w-full bg-white flex flex-col  rounded-md relative z-20">
      <Textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="h-[70%] w-full bg-white border-0 text-md focus:outline-none font-medium"
        placeholder="Enter your Message"
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
          <div>
            <SendHorizontal
              onClick={handleSendMessage}
              className="text-white/70 hover:text-white bg-black rounded-l-md cursor-pointer p-[8px] h-[2.3rem] w-[2.3rem]"
            />
          </div>
          <div className="h-[2.3rem] bg-black w-[1.5rem] rounded-r-md flex justify-center items-center p-[3px] border-l-[1px] border-white/60 ">
            <ChevronDown className="text-white/70 hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatTextArea;
