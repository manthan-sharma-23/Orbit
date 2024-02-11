import { useRecoilState } from "recoil";
import { userState } from "../store/atoms/user.atom";
import { useEffect } from "react";
import { SERVER_URL } from "../../utils/constants/config";
import { OUTPUT_GET_USER } from "typings";

export const useGetUser = (): boolean => {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    setUser({ ...user, isLoading: true });

    fetch(SERVER_URL + "/api/user", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data: OUTPUT_GET_USER) => {
        if (data) {
          setUser({ isLoading: false, user: data.user });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return user.isLoading;
};
