import Loading from "@/components/ui/Loading";
import { useGetThreadInfo } from "@/features/hooks/threads/useGetThreadInfo";
import React from "react";
import { useParams } from "react-router-dom";
import Chat from "./pannel/chat";
import Announcements from "./pannel/announcement";

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

  return <div>{thread.type}</div>;
};

export default ThreadPage;
