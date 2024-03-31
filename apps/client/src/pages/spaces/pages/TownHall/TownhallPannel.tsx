import React from "react";
import { useParams } from "react-router-dom";
import Canvas from "./pannel/Canvas";
import Threads from "./pannel/Threads";
import Invite from "./pannel/Invite";

const TownhallPannel = () => {
  const { path } = useParams();

  if (path === "canvas") {
    return <Canvas />;
  }
  if (path === "threads") {
    return <Threads />;
  }
  if (path === "invite") {
    return <Invite />;
  }
  return <div>Hey</div>;
};

export default TownhallPannel;
