import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { dmAtom } from "../../store/atoms/dm-atoms/dm.atom";
import { SERVER_URL } from "../../../utils/constants/config";
import { userSelector } from "../../store/selectors/user.selector";
import { TEXT, USER } from "typings";
import { userAtom } from "../../store/atoms/user.atom";

export const useGetDmRoom = (id: string, userId: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dmRoom, setDmRoom] = useRecoilState(dmAtom);

  useEffect(() => {
    setLoading(true);

    fetch(SERVER_URL + "/api/room/" + id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then(
        (data: { message: string; room: { id: string; users: USER[] } }) => {
          data.room.users.map((friend) => {
            if (userId == friend.id) {
              setDmRoom({ friend });
            }
          });

          fetch(SERVER_URL + "/api/messages/getmessages/" + id, {
            method: "GET",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data: TEXT[]) => {
              setDmRoom((prev) => ({ ...prev, MESSAGES: data }));
              setLoading(false);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      )
      .catch((err) => console.log(err));
  }, []);

  return { loading, dmRoom };
};
