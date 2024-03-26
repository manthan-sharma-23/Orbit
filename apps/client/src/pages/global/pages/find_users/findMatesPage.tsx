import { Input } from "@/components/ui/input";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosOptions } from "react-icons/io";

const FindMatesPage = () => {
  return (
    <div className="w-full h-full">
      <div className="w-[70%] h-full ml-5">
        <div className="bg-white/10 h-10 rounded-sm mt-4 w-full font-mono flex justify-start items-center px-4 text-lg text-white/70 gap-2">
          <span className="h-full flex justify-center items-center">
            <IoSearchOutline />
          </span>
          <p className="top-[1px] relative flex gap-3">
            SEARCH FOR MATES
            <p className="relative text-white/15">
              ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
            </p>
          </p>
        </div>
        <div className="flex justify-center items-center my-2 h-10 gap-3">
          <Input
            className="w-full h-full border-[.6px] border-white/45 focus-visible:ring-[2.5px] focus-within:border-[#849DFE] focus-visible:ring-[#131620] bg-white/5  rounded-sm "
            placeholder="Search by Role or Username"
          />
          <div className="h-full w-10 border-[1px] bg-[#131620]  cursor-pointer text-lg flex justify-center items-center border-white/45 ring-[2.5px] border-[#849DFE] ring-[#131620]">
            <IoIosOptions className="text-2xl text-[#849DFE]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindMatesPage;
