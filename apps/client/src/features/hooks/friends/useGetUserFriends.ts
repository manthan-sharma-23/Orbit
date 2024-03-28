import { getUserFriends } from "@/features/funcs/friends/getUserFriends";
import { userFriendsAtom } from "@/features/store/atoms/friends/friends.atom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export const useGetUserFriends = () => {
  const [friends, setFriends] = useRecoilState(userFriendsAtom);

  useEffect(() => {
    getUserFriends().then((data) => {
      if (data) setFriends(data);
    });
  }, [userFriendsAtom]);

  return friends;
};
