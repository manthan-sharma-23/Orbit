import { getSpaceInfo } from "@/features/funcs/spaces/getSpaceInfo";
import { spaceDetailsAtom } from "@/features/store/atoms/spaces/space.atom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

export const useGetSpaceInfo = () => {
  const [space, setSpace] = useRecoilState(spaceDetailsAtom);
  const [loading, setLoading] = useState(false);
  const { spaceId } = useParams();

  useEffect(() => {
    if (spaceId) {
      setLoading(true);
      getSpaceInfo({ spaceId })
        .then((data) => {
          if (data) setSpace(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [spaceId]);

  return { space, loading };
};
