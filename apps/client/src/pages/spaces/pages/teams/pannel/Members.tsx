import { userTeamForTeam } from "@/features/store/selectors/space/userTeam.team.selector";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Link, Outlet, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

const Members = () => {
  const { spaceId, teamId } = useParams();
  const userTeam = useRecoilValue(userTeamForTeam);

  return (
    <div className="h-full w-full  flex justify-between items-center">
      <div className="w-[15vw] h-[97%] rounded-lg flex flex-col justify-start items-center py-3">
        <div className="h-auto w-full flex flex-col justify-start items-center ">
          {userTeam?.role === "admin" && (
            <Link
              to={`/home/spaces/${spaceId}/team/${teamId}/members/find`}
              className="flex  w-full items-center justify-start gap-3 text-white/70"
            >
              <IoSearchOutline />
              <p>Find Teammates</p>
            </Link>
          )}
        </div>
        <div className="h-auto w-full flex flex-col justify-start items-center "></div>
      </div>
      <div className="w-[65vw] h-[97%] rounded-lg">
        <Outlet />
      </div>
    </div>
  );
};

export default Members;
