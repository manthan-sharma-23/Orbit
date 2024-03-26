import { getForums } from "@/features/funcs/forums/getForums";
import { ForumsAtom } from "@/features/store/atoms/forums/forums.atom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

export const useGetForums = () => {
  const [forums, setForums] = useRecoilState(ForumsAtom);
  const [loading, setLoading] = useState(false);
  let { path } = useParams();

  useEffect(() => {
    getForums({ forum_type: path })
      .then((data) => {
        setLoading(false);
        if (!data) return [];
        setForums(data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [path]);

  return { forums, loading };
};
