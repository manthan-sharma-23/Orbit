import { SERVER_URL } from "@/lib/config/config";
import { TEAM } from "typings";

export const getTeamInfo = async ({ teamId }: { teamId: string }) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/team/${teamId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
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
