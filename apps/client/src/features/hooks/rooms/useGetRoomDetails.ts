import { getRoomDetails } from "@/features/funcs/rooms/getRoomDetails";
import { RoomDetailsAtom } from "@/features/store/atoms/room/room.atom";
import { userAtom } from "@/features/store/atoms/user.atom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { USER } from "typings";

export const useGetRoomDetails = () => {
  const [room, setRoom] = useRecoilState(RoomDetailsAtom);
  const { user } = useRecoilValue(userAtom);
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<any | null>(null);
  const { roomId } = useParams();
  const [friend, setFriend] = useState<USER | null>(null);

  useEffect(() => {
    if (roomId) {
      setLoading(true);
      getRoomDetails({ roomId })
        .then((data) => {
          if (data && user) {
            setRoom(data);
            setLoading(false);
            setErr(err);

            setFriend(() => {
              const foundUser = data.users.find((u) => u.id !== user.id);
              return foundUser || null;
            });
          }
        })
        .catch((err) => {
          console.log(err);
          setErr(err);
          setLoading(false);
        });
    }
  }, [roomId]);

  return { room, loading, friend, _error: err };
};
