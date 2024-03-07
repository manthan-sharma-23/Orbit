import { userAtom } from "@/features/store/atoms/user.atom";
import React from "react";
import { useRecoilValue } from "recoil";

const Home = () => {
  const user = useRecoilValue(userAtom);
  return <div className="text-black h-full w-full"></div>;
};

export default Home;
