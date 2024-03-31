import Loading from "@/components/ui/Loading";

import { useSetRecoilState } from "recoil";
import { spaceNavAtom } from "@/features/store/atoms/navbar/spaces/space.nav.atom";
import { useGetTownHall } from "@/features/hooks/spaces/useGetTownHall";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

const Townhall = () => {
  const { Townhall, loading } = useGetTownHall();
  const setNavItem = useSetRecoilState(spaceNavAtom);

  useEffect(() => {
    setNavItem("townhall");

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

  if (Townhall === null)
    return (
      <div className="text-lg text-white h-full w-full flex justify-center items-center">
        No Townhall found for this space
      </div>
    );

  return (
    <div className="h-full w-full flex flex-col justify-start items-center">
      <Outlet />
    </div>
  );
};

export default Townhall;
