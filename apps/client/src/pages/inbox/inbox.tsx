import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useParams } from "react-router-dom";
import InboxList from "./inboxList";
import { MailEdit } from "./mail-edit";

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
            <ResizablePanel minSize={15}>
              <MailEdit />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
};

export default Inbox;
