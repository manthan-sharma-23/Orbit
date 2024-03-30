import { SERVER_URL } from "@/lib/config/config";

interface TeamParams {
  name: string;
  description?: string;
  type: string;
  color?: string;
  spaceId: string;
}

export const createTeam = async ({
  name,
  description,
  type,
  color,
  spaceId,
}: TeamParams) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/team/create/team`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        type,
        color,
        spaceId,
      }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
