import React from "react";
import { useParams } from "react-router-dom";

const ThreadPage = () => {
  const { threadId } = useParams();
  return <div>{threadId}</div>;
};

export default ThreadPage;
