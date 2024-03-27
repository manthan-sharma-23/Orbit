import { getUsers } from "@/features/funcs/user/get.all.users";
import { UsersAtom } from "@/features/store/atoms/users/users.atom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export const useGetUsers = () => {
  const [users, setUsers] = useRecoilState(UsersAtom);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((er) => {
        console.log(er);
        setLoading(false);
      });
  }, []);

  return { users, loading };
};
