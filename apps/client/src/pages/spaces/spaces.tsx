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
import SpaceInfoPannel from "./spaceInfoPannel";
import SpaceActivityPannel from "./spaceActivityPannel";
import { selectedSpaceAtom } from "@/features/store/atoms/spaces/spaceId.atom";

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
          minSize={20}
          defaultSize={20}
          maxSize={20}
          className="p-0 border-0 flex flex-col"
        >
          <nav className="flex justify-start items-center p-2 h-[8vh] overflow-hidden gap-3">
            <Select
              onValueChange={(id) => {
                setSelectedSpace({ id });
              }}
            >
              <SelectTrigger className="w-full h-[6vh] py-3 border-[1px] border-black/30">
                <SelectValue defaultValue={"1"} defaultChecked={false} />
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
