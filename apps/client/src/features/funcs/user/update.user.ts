import { SERVER_URL } from "@/lib/config/config";
import { USER } from "typings";

export const updateUser = async (update: USER) => {
  try {
    console.log(update);
    const response = await fetch(`${SERVER_URL}/api/user/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(update),
    });

    if (!response.ok) throw Error;

    const data: USER = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
