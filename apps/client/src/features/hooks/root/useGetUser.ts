import { userAtom } from "@/features/store/atoms/user.atom";
import { SERVER_URL } from "@/lib/config/config";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { USER } from "typings";

export const useGetUser = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    setUser((e) => ({ ...e, loading: true }));
    fetch(`${SERVER_URL}/api/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          window.location.assign("/auth/signin");
        }
        setUser((e) => ({ ...e, loading: false }));
        return res.json();
      })
      .then((data: { message?: string; user: USER }) => {
        setUser({ user: data.user, loading: false });
      })
      .catch((err) => {
        setUser((e) => ({ ...e, loading: false }));
        console.log(err);
      });
  }, []);

  return user;
};
