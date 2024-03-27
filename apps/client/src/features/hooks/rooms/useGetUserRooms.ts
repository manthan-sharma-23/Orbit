import { getUserRooms } from "@/features/funcs/rooms/getUserRooms";
import { RoomsAtom } from "@/features/store/atoms/room/rooms.atom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export const useGetUserRooms = () => {
  const [rooms, setRooms] = useRecoilState(RoomsAtom);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUserRooms()
      .then((data) => {
        setLoading(false);
        if (data !== null) setRooms(data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  return { rooms, loading };
};
