import Loading from "@/components/ui/Loading";
import { useGetThreadInfo } from "@/features/hooks/threads/useGetThreadInfo";

import Chat from "./pannel/chat";
import Announcements from "./pannel/announcement";
import Video from "./pannel/video-call/video";

const ThreadPage = () => {
  const { thread, loading } = useGetThreadInfo();

  if (loading) {
    return (
      <div className="h-full w-full">
        <Loading />
      </div>
    );
  }

  if (thread.type === "chat") {
    return <Chat />;
  }
  if (thread.type === "announcement") {
    return <Announcements />;
  }
  if (thread.type === "video") {
    return <Video />;
  }

  return <div>{thread.type}</div>;
};

export default ThreadPage;
