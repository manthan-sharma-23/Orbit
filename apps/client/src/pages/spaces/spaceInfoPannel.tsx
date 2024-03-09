import { selectedSpaceAtom } from "@/features/hooks/spaces/spaceId.atom";
import { useRecoilValue } from "recoil";

const SpaceInfoPannel = () => {
  const spaceId = useRecoilValue(selectedSpaceAtom);

  return <div className="h-full w-full"></div>;
};

export default SpaceInfoPannel;
