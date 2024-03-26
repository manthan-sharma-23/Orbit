import Loading from "@/components/ui/Loading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { userAtom } from "@/features/store/atoms/user.atom";
import _ from "lodash";
import React from "react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const ProfilePage = () => {
  const { user, loading } = useRecoilValue(userAtom);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="h-full w-full">
        <Loading />
      </div>
    );
  }
  return (
    <div
      className="h-full w-full p-5 font-mono"
      style={{ fontFamily: ' "Kode Mono", monospace' }}
    >
      <div className="w-[70%] h-full">
        <div className="w-full h-[25vh] border-[1px] border-white/45  p-1  rounded-sm ">
          <div className="h-full border-[1px] rounded-md border-white/10">
            <div className="h-[13vh] flex justify-around items-center p-3 ">
              <div className="h-[6.3rem] p-1 flex gap-4 justify-around items-center  bg-white/5">
                <img
                  src={user?.image}
                  alt="profile"
                  className="bg-black h-[6rem] w-[5.8rem] rounded-xs p-1"
                />
                <div className="w-[40vw] h-full flex flex-col justify-start items-start">
                  <div className="text-2xl my-1">{_.upperCase(user?.name)}</div>
                  <div className="text-lg text-white/35 hover:underline hover:text-white/80 cursor-pointer">
                    {user?.username}
                  </div>
                </div>
              </div>
            </div>
            <Separator className="bg-white/10" />
            <div className="  h-[10vh] w-full flex flex-col justify-start items-center px-4">
              <div className="h-[40%]  w-full"></div>
              <div className="h-[60%]  w-full flex justify-between items-center">
                <div className="h-full w-auto flex justify-center items-center text-2xl gap-4">
                  {user?.github && (
                    <Link to={user?.github}>
                      <FaGithub />
                    </Link>
                  )}
                  {user?.twitter && (
                    <Link to={user?.twitter || ""}>
                      <FaXTwitter />
                    </Link>
                  )}
                  {user?.linkedIn && (
                    <Link to={user?.linkedIn || ""}>
                      <FaLinkedinIn />
                    </Link>
                  )}
                </div>
                <Button
                  onClick={() => navigate("/home/globe/profile/edit")}
                  className="bg-white/90 text-black text-lg hover:bg-transparent hover:text-white/80 rounded-sm"
                >
                  EDIT PROFILE
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
