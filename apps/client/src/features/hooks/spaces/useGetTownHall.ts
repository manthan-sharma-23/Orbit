import { getTownHall } from "@/features/funcs/spaces/getTownHall";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TEAM } from "typings";

export const useGetTownHall = () => {
  const [Townhall, setTownHall] = useState<TEAM | null>(null);
  const [loading, setLoading] = useState(false);
  const { spaceId } = useParams();

  useEffect(() => {
    if (spaceId) {
      setLoading(true);
      getTownHall({ spaceId })
        .then((data) => {
          setLoading(false);
          if (data) setTownHall(data);
        })
        .catch((err) => {
          setLoading(true);
          console.log(err);
        });
    }
  }, [spaceId]);

  return { Townhall, loading };
};
