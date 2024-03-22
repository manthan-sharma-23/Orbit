import { useParams } from "react-router-dom";

const SpaceActivityPannel = () => {
  const { threadId } = useParams();
  return <div className="h-full w-full">{threadId}</div>;
};

export default SpaceActivityPannel;
