import { getUserById } from "@/features/funcs/user/getuserById";
import { useEffect, useState } from "react";
import { USER } from "typings";

export const useGetUserById = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<USER | null>(null);
  const [userLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUserById({ userId })
      .then((data) => {
        setLoading(false);
        if (data) setUser(data.user);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [userId]);

  return { user, userLoading };
};
