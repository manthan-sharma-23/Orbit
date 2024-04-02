import { Separator } from "@/components/ui/separator";
import SpaceSideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import NavbarRedirect from "../components/Navbar.redirect";
import { useRecoilValue } from "recoil";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SpacesInfoAtom } from "@/features/store/atoms/spaces/userSpace.atom";

const SpaceId = () => {
  const space = useRecoilValue(SpacesInfoAtom);
  console.log(space);

  return (
    <div
      className="h-full w-full p-0 bg-[#0F0F0F] text-white"
      style={{ fontFamily: ' "Kode Mono", monospace' }}
    >
      <div className=" h-[8vh] w-full flex justify-between items-center overflow-hidden px-3 m-0">
        <div className="text-lg font-bold text-white/80  w-[16%]">
          <div className=" flex  gap-3 items-end">
            <div className="h-[3rem] w-[3rem] flex justify-center items-center border border-white/50 bg-blue-950/40 rounded-lg">
              <img src={""} className="h-8 w-8 bg-black" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px] border-white/30">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Spaces</SelectLabel>
                  {/* {space.UserSpace?.map((userspace) => (
                    <SelectItem value={userspace.space?.id}>
                      {userspace.space?.name}
                    </SelectItem>
                  ))} */}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-[85%] h-full ">
          <NavbarRedirect />
        </div>
      </div>
      <Separator className="bg-white/10 m-0 p-0" />
      <div className="h-[92vh] w-full p-0 flex">
        <div className="min-w-[16vw] h-full font-sans">
          <SpaceSideBar />
        </div>
        <div className="w-[90%] h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SpaceId;
