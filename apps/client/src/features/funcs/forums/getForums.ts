import { SERVER_URL } from "@/lib/config/config";
import { FORUM } from "typings";

export const getForums = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/api/forums/all`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (!response.ok) throw Error;

    const data: FORUM[] = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
