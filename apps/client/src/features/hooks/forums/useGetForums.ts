import { getForums } from "@/features/funcs/forums/getForums";
import { ForumsAtom } from "@/features/store/atoms/forums/forums";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export const useGetForums = ({
  forum_type,
}: {
  forum_type: string | undefined;
}) => {
  const [forums, setForums] = useRecoilState(ForumsAtom);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getForums()
      .then((data) => {
        setLoading(false);
        if (!data) return [];
        setForums(data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return { forums, loading };
};
