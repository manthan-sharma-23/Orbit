import Loading from "@/components/ui/Loading";
import { useGetSpaceTeamAndThreads } from "@/features/hooks/spaces/useGetSpaceTeamAndThreads";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const SpacePannel = () => {
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const { loading, teams } = useGetSpaceTeamAndThreads();
  

  if (!spaceId) navigate("/home/space");

  if (loading) {
    return (
      <div className="h-full w-full">
        <Loading />
      </div>
    );
  }

  return <div className="h-full w-full"></div>;
};

export default SpacePannel;
