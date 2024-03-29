import { getSpaceDetails } from "@/features/funcs/spaces/getSpaceDetails";
import { spaceDetailsAtom } from "@/features/store/atoms/spaces/space.atom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

export const useGetSpaceDetails = () => {
  const [space, setSpace] = useRecoilState(spaceDetailsAtom);
  const [loading, setLoading] = useState(false);
  const { spaceId } = useParams();

  useEffect(() => {
    if (spaceId) {
      setLoading(true);
      getSpaceDetails({ spaceId })
        .then((data) => {
          if (data) {
            setLoading(false);
            setSpace(data);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [spaceId]);

  return { space, loading };
};
