import React from "react";
import { useRecoilValue } from "recoil";
import { userSelector } from "../features/store/selectors/user.selector";

const HomePage = () => {
  const { username } = useRecoilValue(userSelector);
  return <div className="text-white">{username}</div>;
};

export default HomePage;
