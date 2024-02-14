import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { SERVER_URL } from "../../../utils/constants/config";
import { FRIEND } from "typings";
import { friendsAtom } from "../../store/atoms/dm-atoms/friends.atom";

export const useGetFriends = () => {
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useRecoilState(friendsAtom);

  useEffect(() => {
    setLoading(true);
    fetch(SERVER_URL + "/api/feature/friends", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data: { message: string; friends: FRIEND[] }) => {
        setFriends(data.friends);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return { loading, friends };
};
