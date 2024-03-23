import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useParams } from "react-router-dom";
import InboxList from "./inboxList";

const Inbox = () => {
  const { mailId } = useParams();
  return (
    <div className="h-full w-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel minSize={40}>
          <InboxList />
        </ResizablePanel>

        {mailId && (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel minSize={15}>Two</ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
};

export default Inbox;
