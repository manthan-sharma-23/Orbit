import { SERVER_URL } from "@/lib/config/config";
import { USER } from "typings";

export const getUsers = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/api/user/all`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (!response.ok) throw Error;

    const data: USER[] = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
