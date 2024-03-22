import ChatTextArea from "@/components/elements/ChatTextArea";
import Loading from "@/components/ui/Loading";
import { Separator } from "@/components/ui/separator";
import { TypographyH2 } from "@/components/ui/typography/h2";
import { useGetThreadInfo } from "@/features/hooks/threads/useGetThreadInfo";
import _ from "lodash";

import { useParams } from "react-router-dom";

export const Thread = () => {
  const { loading, thread } = useGetThreadInfo();

  if (loading) {
    return (
      <div className="h-full w-full">
        <Loading />
      </div>
    );
  }
  return (
    <span className="h-full w-full p-0 flex flex-col">
      <div className="w-full h-[8vh] flex items-center p-2">
        <TypographyH2 text={_.upperFirst(thread.name)} className="ml-1" />
      </div>
      <Separator className="bg-black/10" />
      <div className="w-full h-[92vh]   flex flex-col">
        <div className="h-[80%] w-full"></div>
        <div className="h-[20%] w-full  bg-transparent flex justify-center items-center ">
          <div className="w-[80%] h-full rounded-md p-[2.5px] bg-black/50 mb-10">
            <ChatTextArea />
          </div>
        </div>
      </div>
    </span>
  );
};
