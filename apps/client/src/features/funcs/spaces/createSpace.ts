import { SERVER_URL } from "@/lib/config/config";

export const createSpace = async ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/space/create/`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });

    if (!response.ok) throw Error;

    const data: { space: { id: string } } = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
