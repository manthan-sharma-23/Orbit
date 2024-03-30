import { SERVER_URL } from "@/lib/config/config";
import { SPACE_SCHEMA, TEAM } from "typings";

export const getTownHall = async ({ spaceId }: { spaceId: string }) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/space/townhall/${spaceId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (!response.ok) throw Error;

    const data: TEAM = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
