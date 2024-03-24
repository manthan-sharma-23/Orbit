import { Outlet } from "react-router-dom";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TypographyH3 } from "@/components/ui/typography/h3";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetUserSpaces } from "@/features/hooks/spaces/useGetUserSpaces";
import { TypographyH2 } from "@/components/ui/typography/h2";

const Spaces = () => {
  return (
    <div className="h-full w-full p-0 bg-black text-white">
      <div className=" h-[8vh] w-full flex justify-between items-center overflow-hidden px-3 m-0">
        <div>
          <TypographyH2
            text="Spaces"
            className=" tracking-wide  text-white/70 cursor-pointer hover:text-white"
          />
        </div>
        <div className="">
          <SpaceSelect />
        </div>
      </div>
      <Separator className="bg-white/50 m-0 p-0" />

      <div className="h-[92vh] w-full"></div>
    </div>
  );
};

const SpaceSelect = () => {
  const { spaces } = useGetUserSpaces();
  console.log();
  return (
    <div>
      <Select defaultValue={" "} defaultOpen>
        <SelectTrigger className="min-w-[14rem] h-[2.5rem] border-white/50">
          <SelectValue placeholder="Select a Space" />
        </SelectTrigger>
        <SelectContent className="bg-black border-white/40 " position="popper">
          {spaces &&
            spaces.map((space) => (
              <SelectItem
                value={space.space.id}
                className="flex justify-start items-center gap-2 bg-black text-white hover:bg-black cursor-pointer rounded-lg "
              >
                <div className="flex justify-start items-center px-2 gap-2 text-lg text-white/70">
                  <p className="h-4 w-4 rounded-full overflow-hidden inline-block">
                    {space.space.image ? (
                      <img src={space.space.image} />
                    ) : (
                      <p className=" h-full w-full bg-violet-400" />
                    )}
                  </p>
                  <div className="mr-5">{space.space.name}</div>
                </div>
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Spaces;
