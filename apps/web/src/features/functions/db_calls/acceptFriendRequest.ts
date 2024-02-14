import { TEXT } from "typings";
import { SERVER_URL } from "../../../utils/constants/config";

export const addFriendCall = (requestId: string) => {
  fetch(SERVER_URL + "/api/feature/accept/" + requestId, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {})
    .catch((err) => console.log(err));
};
