import React, { useState } from "react";
import { SERVER_URL } from "../../utils/constants/config";
import { USER } from "typings";

export const useGetUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<USER[]>([]);

  React.useEffect(() => {
    setLoading(false);
    fetch(SERVER_URL + "/api/user/all", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data: USER[]) => {
        setUsers(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return { loading, users };
};
