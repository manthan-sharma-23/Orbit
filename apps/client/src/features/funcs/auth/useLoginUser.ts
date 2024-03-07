import { SERVER_URL } from "@/lib/config/config";
import React from "react";
import { OUTPUT_LOGIN_FORM } from "typings";

export const loginUser = ({
  setLoading,
  email,
  password,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  password: string;
}) => {
  setLoading(true);
  fetch(`${SERVER_URL}/api/user/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data: OUTPUT_LOGIN_FORM) => {
      window.localStorage.setItem("token", data.token);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
};