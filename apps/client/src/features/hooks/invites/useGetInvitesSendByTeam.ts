import { fetchUserInvites } from "@/features/funcs/invites/fetchInvites";
import { fetchTeamInvites } from "@/features/funcs/invites/fetchTeamInvites";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { INVITE } from "typings";

export const useGetTeamInvitesSentByTeam = () => {
  const [invites, setInvites] = useState<INVITE[]>([]);
  const [loading, setLoading] = useState(false);
  const { teamId } = useParams();

  useEffect(() => {
    if (teamId) {
      setLoading(true);
      fetchTeamInvites({ teamId })
        .then((data) => {
          setLoading(false);
          if (data) setInvites(data);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [teamId]);

  return { invites,setInvites, loading };
};
