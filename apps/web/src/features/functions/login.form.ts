import { INPUT_LOGIN_FORM, OUTPUT_LOGIN_FORM } from "typings";
import { SERVER_URL } from "../../utils/constants/config";

export const loginForm = (form: INPUT_LOGIN_FORM) => {
  fetch(SERVER_URL + "/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  })
    .then((res) => res.json())
    .then((data: OUTPUT_LOGIN_FORM) => {
      window.localStorage.setItem("token", data.token);
      window.location.assign("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
