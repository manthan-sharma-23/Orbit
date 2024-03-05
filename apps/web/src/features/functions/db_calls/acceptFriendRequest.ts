import { TEXT } from "typings";
import { SERVER_URL } from "../../../utils/constants/config";

export const acceptFriendCall = (requestId: string) => {
  console.log("input")
  fetch(SERVER_URL + "/api/feature/accept/" + requestId, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {console.log(data)})
    .catch((err) => console.log(err));
};
