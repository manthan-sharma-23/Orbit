import { SpacesInfoAtom } from "@/features/store/atoms/spaces/userSpace.atom";
import { SERVER_URL } from "@/lib/config/config";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { USER_SPACE_SCHEMA } from "typings";

export const useGetUserSpaces = () => {
  const [userSpace, setUserSpace] = useRecoilState(SpacesInfoAtom);
  const {spaceId}=useParams()

  useEffect(() => {
    setUserSpace((e) => ({ ...e, loading: true }));
    fetch(`${SERVER_URL}/api/space/user`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error;
        }
        return res.json();
      })
      .then((data: USER_SPACE_SCHEMA[]) => {
        setUserSpace({ loading: false, userSpace: data });
      })
      .catch((err) => {
        console.log(err);
        setUserSpace((e) => ({ ...e, loading: false }));
      });
  }, [spaceId]);
  return { spaces: userSpace.userSpace, loading: userSpace.loading };
};
