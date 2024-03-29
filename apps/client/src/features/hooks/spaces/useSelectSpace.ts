import { selectedSpaceAtom } from "@/features/store/atoms/spaces/spaceId.atom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export const useSelectSpace = () => {
  const [space, selectSpace] = useRecoilState(selectedSpaceAtom);

  const spaceId = window.localStorage.getItem("spaceId");

  useEffect(() => {
    selectSpace({ id: spaceId });
  }, [spaceId]);
};
