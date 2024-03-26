import { getForumById } from "@/features/funcs/forums/getForumById";
import { ForumAtom } from "@/features/store/atoms/forums/forum.atom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

export const useGetForum = () => {
  const [loading, setLoading] = useState(false);
  const [forum, setForum] = useRecoilState(ForumAtom);

  const { forumId } = useParams();

  useEffect(() => {
    if (forumId) {
      setLoading(true);
      getForumById({ forumId })
        .then((data) => {
          if (data) setForum(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [forumId]);

  return { loading, forum };
};
