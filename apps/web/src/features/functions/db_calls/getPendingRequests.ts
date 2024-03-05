import { TEXT } from "typings";
import { SERVER_URL } from "../../../utils/constants/config";

export const getPendingRequests = () => {
  fetch(SERVER_URL + "/api/feature/pending" , {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {})
    .catch((err) => console.log(err));
};
