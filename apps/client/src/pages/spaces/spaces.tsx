import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BellRing, ListFilter, Plus } from "lucide-react";
import { useGetUserSpaces } from "@/features/hooks/spaces/useGetUserSpaces";
import Loading from "@/components/ui/Loading";
import { getRandomNumberWithLeadingZeros } from "@/lib/utils/rnad";
import { useSetRecoilState } from "recoil";
import { selectedSpaceAtom } from "@/features/hooks/spaces/spaceId.atom";
import SpaceInfoPannel from "./spaceInfoPannel";
import SpaceActivityPannel from "./spaceActivityPannel";

const Spaces = () => {
  const { loading, spaces } = useGetUserSpaces();
  const setSelectedSpace = useSetRecoilState(selectedSpaceAtom);

  if (loading) {
    return (
      <div className="h-full w-full">
        <Loading />
      </div>
    );
  }
  return (
    <div className="h-full w-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          minSize={25}
          defaultSize={30}
          maxSize={35}
          className="p-0 border-0 flex flex-col"
        >
          <nav className="flex justify-start items-center p-2 h-[8vh] overflow-hidden gap-3">
            <Select
              onValueChange={(id) => {
                setSelectedSpace({ id });
              }}
            >
              <SelectTrigger className="w-[55%] h-[6vh] py-3 border-[1px] border-black/30">
                <SelectValue defaultValue={""} />
              </SelectTrigger>
              <SelectContent>
                {spaces.map((space, index) => (
                  <SelectItem value={space.space.id} key={index}>
                    <div className="flex justify-start items-center w-auto">
                      <img
                        src={
                          space.space.image ||
                          `/channel_icons/${getRandomNumberWithLeadingZeros(4)}.jpg`
                        }
                        className="h-[4vh] w-[4vh] rounded-full border-[1px] border-black"
                      />
                      <p className="w-auto h-[4vh] flex justify-start items-center ml-3 text-lg font-medium">
                        {space.space.name}
                      </p>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <section className="w-[45%] h-[6vh] py-3 flex justify-end gap-4 pr-4 items-center">
              <ListFilter className="border-[1px] border-black/20 text-black/60 hover:text-black/85 h-[4.5vh] w-[4.5vh] p-2 rounded-md cursor-pointer hover:bg-black/15" />
              <BellRing className="border-[1px] border-black/20 text-black/60 hover:text-black/85 h-[4.5vh] w-[4.5vh] p-2 rounded-md cursor-pointer hover:bg-black/15" />
              <Plus className="border-[1px] border-black/20 text-black/60 hover:text-black/85 h-[4.5vh] w-[4.5vh] p-2 rounded-md cursor-pointer hover:bg-black/15" />
            </section>
          </nav>
          <Separator className="bg-black/10" />
          <section className="h-[92vh]">
            <SpaceInfoPannel />
          </section>
        </ResizablePanel>
        <ResizableHandle withHandle className="border-0" />
        <ResizablePanel className="border-0">
          <SpaceActivityPannel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Spaces;
