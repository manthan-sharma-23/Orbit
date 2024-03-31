import Loading from "@/components/ui/Loading";

import { useSetRecoilState } from "recoil";
import { spaceNavAtom } from "@/features/store/atoms/navbar/spaces/space.nav.atom";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useGetTeamInfo } from "@/features/hooks/teams/useGetTeam";

const TeamPage = () => {
  const setNavItem = useSetRecoilState(spaceNavAtom);
  const { loading } = useGetTeamInfo();

  useEffect(() => {
    setNavItem("team");

    return () => {
      setNavItem("");
    };
  }, []);
  
  if (loading) {
    return (
      <div className="h-full w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col justify-start items-center">
      <Outlet />
    </div>
  );
};

export default TeamPage;
