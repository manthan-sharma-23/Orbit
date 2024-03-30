import { fetchUserInvites } from "@/features/funcs/invites/fetchInvites";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { INVITE } from "typings";

export const useGetTeamInvites = () => {
  const [invites, setInvites] = useState<INVITE[]>([]);
  const [loading, setLoading] = useState(false);
  const { path } = useParams();

  useEffect(() => {
    setLoading(true);
    fetchUserInvites()
      .then((data) => {
        setLoading(false);
        if (data) setInvites(data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [path]);

  return { invites, loading };
};
