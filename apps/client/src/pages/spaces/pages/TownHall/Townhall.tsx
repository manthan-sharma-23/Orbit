import React from "react";
import { useParams } from "react-router-dom";

const Townhall = () => {
  const { spaceId } = useParams();
  return <div>townhall</div>;
};

export default Townhall;
