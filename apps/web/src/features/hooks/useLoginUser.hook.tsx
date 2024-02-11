import React from "react";
import { SERVER_URL } from "../../utils/constants/config";
import { INPUT_LOGIN_FORM, OUTPUT_LOGIN_FORM } from "typings";

export const useLoginUser = (input: INPUT_LOGIN_FORM) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsLoading(true);
    fetch(SERVER_URL + "/api/user/login", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
      .then((res) => res.json())
      .then((data: OUTPUT_LOGIN_FORM) => {
        if (data) {
          localStorage.setItem("token", data.token);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return isLoading;
};
