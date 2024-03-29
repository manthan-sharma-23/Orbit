import Loading from "@/components/ui/Loading";
import { Separator } from "@/components/ui/separator";
import { useGetSpaceDetails } from "@/features/hooks/spaces/useGetSpaceDetails";
import { useGetUserSpaces } from "@/features/hooks/spaces/useGetUserSpaces";
import { spaceDetailsAtom } from "@/features/store/atoms/spaces/space.atom";
import _ from "lodash";
import React from "react";
import { BiDotsVertical } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

const SpaceInfo = () => {
  const { loading } = useGetSpaceDetails();
  const space = useRecoilValue(spaceDetailsAtom);

  if (loading) {
    return (
      <div className="h-full w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="text-white h-[92vh] w-full flex justify-start items-center pl-[5vw]">
      <div className="h-full w-[60%] py-4">
        <div className="h-[10%] w-full flex justify-between items-center">
          <div className="h-full w-full flex justify-start items-center gap-5">
            <div className="h-full w-auto border border-white/30 p-1 rounded-md">
              <img
                src={space.image}
                className="h-full border border-white/15 p-1"
              />
            </div>
            <div className="h-full w-[40%] flex flex-col justify-around items-start gap">
              <p className="text-2xl font-semibold text-white/80">
                {_.upperCase(space.name)}
              </p>
              {space.UserSpace && (
                <p className="text-sm font-semibold text-white/80">
                  {space.UserSpace.map(({ user }, index) => {
                    return <img src={user.image} />;
                  })}
                </p>
              )}
            </div>
          </div>
          <p>
            <BiDotsVertical className="text-3xl cursor-pointer text-white/70" />
          </p>
        </div>
        <Separator className="my-4 bg-white/10" />
        <div className="h-[80%] w-full"></div>
      </div>
    </div>
  );
};

export default SpaceInfo;
