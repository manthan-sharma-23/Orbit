import { threadAtom } from "@/features/store/atoms/thread/thread.atom";
import React from "react";
import { useRecoilValue } from "recoil";

const Announcements = () => {
  const thread = useRecoilValue(threadAtom);
  return <div className="h-full w-full">{thread.name}</div>;
};

export default Announcements;
