import { SERVER_URL } from "@/lib/config/config";
import { USER } from "typings";

export const getUserById = async ({ userId }: { userId: string }) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/user/getUser/${userId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (!response.ok) throw Error;

    const data: { user: USER } = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
