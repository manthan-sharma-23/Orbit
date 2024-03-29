import React from "react";
import { useParams } from "react-router-dom";

const TeamPage = () => {
  const { teamId } = useParams();

  return <div>{teamId}</div>;
};

export default TeamPage;
