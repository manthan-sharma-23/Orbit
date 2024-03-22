import { SERVER_URL } from "@/lib/config/config";

export const createThread = async ({
  teamId,
  name,
  type,
}: {
  teamId: string;
  name: string;
  type?: string;
}) => {
  const response = await fetch(`${SERVER_URL}/api/threads/create`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      teamId,
      name,
      type,
    }),
  });

  if (!response.ok) {
    return null;
  }

  await response.json();

  return { message: "Thread Created !" };
};
