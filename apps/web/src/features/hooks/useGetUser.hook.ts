import React from "react";
import Recoil from "recoil";
import { userAtom } from "../store/atoms/user.atom";
import { SERVER_URL } from "../../utils/constants/config";
import { OUTPUT_GET_USER } from "typings";

export const useGetUser = (): boolean => {
  const [user, setUser] = Recoil.useRecoilState(userAtom);

  React.useEffect(() => {
    setUser({ ...user, isLoading: true });

    fetch(SERVER_URL + "/api/user/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data: OUTPUT_GET_USER) => {
        if (data) setUser({ user: data.user, isLoading: false });
      })
      .catch((err) => console.log(err));
  }, []);

  return user.isLoading;
};
