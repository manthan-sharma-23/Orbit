import Loading from "@/components/ui/Loading";
import { Separator } from "@/components/ui/separator";
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
    <div className="h-full w-full p-5 ">
      <div className="w-[75%] h-full">
        <div className="w-full h-[25vh] border-[1px] border-white/45 ring-[3.5px] p-1 border-[#849DFE] ring-[#050508]  rounded-sm ">
          <div className="h-full border-[1px] rounded-md border-white/10">
            <div className="h-[13vh] flex justify-start items-center px-3">
              <img
                src={user?.image}
                alt="profile"
                className="bg-black h-[5.8rem] w-[5.8rem] border-[1px] border-white/20 rounded-md p-1"
              />
            </div>
            <Separator className="bg-white/10" />
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
