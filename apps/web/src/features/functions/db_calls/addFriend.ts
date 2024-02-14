import { TEXT } from "typings";
import { SERVER_URL } from "../../../utils/constants/config";

export const addFriendCall = (friendId: string) => {
  fetch(SERVER_URL + "/api/feature/addfriend", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      friendId: friendId,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {})
    .catch((err) => console.log(err));
};
