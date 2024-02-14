import { USER } from "typings";
import { SERVER_URL } from "../../../utils/constants/config";
import { useEffect, useState } from "react";

export const useGetPendingRequests = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<{ users: USER; requedId: string }[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch(SERVER_URL + "/api/feature/pending", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // setUsers(data);
        // setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(users);

  return { loading, users };
};
