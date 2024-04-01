import { getThreadInfo } from "@/features/funcs/threads/getThreadInfo";
import { threadAtom } from "@/features/store/atoms/thread/thread.atom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { THREAD_SCHEMA } from "typings";

export const useGetThreadInfo = () => {
  const { threadId } = useParams();
  const [loading, setLoading] = useState(false);

  const [thread, setThread] = useRecoilState(threadAtom);

  useEffect(() => {
    setLoading(true);
    getThreadInfo({ threadId: threadId! })
      .then((data) => {
        if (data === null) return null;
        setThread(data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });

    return () => {
      setThread({} as THREAD_SCHEMA);
    };
  }, [threadId]);

  return { thread, loading };
};
