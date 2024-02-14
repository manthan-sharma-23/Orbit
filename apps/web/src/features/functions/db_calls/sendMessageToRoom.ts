import { TEXT } from "typings";
import { SERVER_URL } from "../../../utils/constants/config";

export const sendMessageToRoomDb = (message: TEXT, roomId: string) => {
  fetch(SERVER_URL + "/api/messages/sendmessage", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, roomId }),
  })
    .then((res) => res.json())
    .then((data) => console.log("Data",data))
    .catch((err) => console.log(err));
};
