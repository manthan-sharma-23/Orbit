import { selectedSpaceAtom } from "@/features/store/atoms/spaces/spaceId.atom";
import { spaceThreadsAtom } from "@/features/store/atoms/spaces/spaceTeamsAndThreads.atom";
import { SERVER_URL } from "@/lib/config/config";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { TEAM } from "typings";

export const useGetSpaceTeamAndThreads = () => {
  const [spaceThreads, setSpaceThreads] = useRecoilState(spaceThreadsAtom);
  const spaceId = useRecoilValue(selectedSpaceAtom);

  useEffect(() => {
    setSpaceThreads((e) => ({ ...e, loading: true }));

    fetch(`${SERVER_URL}/api/space/threads/` + spaceId.id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error;
        }
        return res.json();
      })
      .then((data: TEAM[]) => {
        setSpaceThreads({ loading: false, teams: data });
      })
      .catch((e) => {
        setSpaceThreads((e) => ({ ...e, loading: false }));
        console.log(e);
      });
  }, [spaceId]);

  return spaceThreads;
};
