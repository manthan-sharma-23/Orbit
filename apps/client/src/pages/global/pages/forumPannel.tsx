import React from "react";
import { useParams } from "react-router-dom";

const ForumPannel = () => {
  const { forumId } = useParams();
  return <div>{forumId}</div>;
};

export default ForumPannel;
