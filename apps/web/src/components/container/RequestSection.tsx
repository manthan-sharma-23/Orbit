import React from "react";
import { useRecoilValue } from "recoil";
import { userSelector } from "../../features/store/selectors/user.selector";

const options = {
  friends: "friends",
  notifs: "notifs",
  pending: "pending",
};

const RequestSection = () => {
  const username = useRecoilValue(userSelector);
  return (
    <div className="w-full h-full bg-black/30">
      <div className="bg-transparent w-full h-[15%] text-white font-sans flex justify-center items-center text-2xl font-medium tracking-wide">
        {username.username}
        <img src="" />
      </div>
      <div className="bg-black h-[85%] w-full rounded-t-2xl"></div>
    </div>
  );
};

export default RequestSection;
