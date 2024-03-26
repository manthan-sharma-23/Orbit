import Loading from "@/components/ui/Loading";
import { userAtom } from "@/features/store/atoms/user.atom";
import React from "react";
import { useRecoilValue } from "recoil";

const ProfilePage = () => {
  const { user, loading } = useRecoilValue(userAtom);

  if (loading) {
    return (
      <div className="h-full w-full">
        <Loading />
      </div>
    );
  }
  return (
    <div className="h-full w-full ">
      <div className="w-[75%] h-full border">{user?.name}</div>
    </div>
  );
};

export default ProfilePage;
