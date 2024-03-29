import { Separator } from "@/components/ui/separator";
import SpaceSideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";

const SpaceId = () => {
  return (
    <div
      className="h-full w-full p-0 bg-[#0F0F0F] text-white"
      style={{ fontFamily: ' "Kode Mono", monospace' }}
    >
      <div className=" h-[8vh] w-full flex justify-between items-center overflow-hidden px-3 m-0">
        <div className="text-lg font-bold text-white/80">
          <p>/// SPACES</p>
        </div>
      </div>
      <Separator className="bg-white/10 m-0 p-0" />
      <div className="h-[92vh] w-full p-0 flex">
        <div className="w-[25vw] h-full font-sans">
          <SpaceSideBar />
        </div>
        <div className="w-[80%] h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SpaceId;
