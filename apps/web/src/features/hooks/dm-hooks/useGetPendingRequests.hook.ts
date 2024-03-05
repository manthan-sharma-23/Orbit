import { USER } from "typings";
import { SERVER_URL } from "../../../utils/constants/config";
import { useEffect, useState } from "react";

interface PendingRequests {
  user: USER;
  requestId: string;
}
export const useGetPendingRequests = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<PendingRequests[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch(SERVER_URL + "/api/feature/pending", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data: PendingRequests[]) => {
        console.log(data);
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  return { loading, users };
};
