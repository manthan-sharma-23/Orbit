import { SERVER_URL } from "@/lib/config/config";
import { SPACE_SCHEMA } from "typings";

export const getSpaceInfo = async ({ spaceId }: { spaceId: string }) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/space/info/${spaceId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (!response.ok) throw Error;

    const data: SPACE_SCHEMA = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
