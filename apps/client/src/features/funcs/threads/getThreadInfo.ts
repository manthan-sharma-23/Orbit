import { SERVER_URL } from "@/lib/config/config";
import { THREAD_SCHEMA } from "typings";

export const getThreadInfo = async ({ threadId }: { threadId: string }) => {
  const response = await fetch(`${SERVER_URL}/api/threads/info/${threadId}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return null;
  }

  const data: THREAD_SCHEMA = await response.json();

  return data;
};
