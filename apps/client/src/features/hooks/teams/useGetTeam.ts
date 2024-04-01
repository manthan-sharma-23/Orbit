import { getTeamInfo } from "@/features/funcs/teams/getTeamInfo";
import { getThreadInfo } from "@/features/funcs/threads/getThreadInfo";
import { teamAtom } from "@/features/store/atoms/team/team.atom";
import { threadAtom } from "@/features/store/atoms/thread/thread.atom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

export const useGetTeamInfo = () => {
  const { teamId } = useParams();
  const [loading, setLoading] = useState(false);

  const [team, setTeam] = useRecoilState(teamAtom);

  useEffect(() => {
    if (teamId) {
      setLoading(true);
      getTeamInfo({ teamId })
        .then((data) => {
          if (data === null) return null;
          setTeam(data);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    }
  }, [teamId]);

  return { team, loading };
};
