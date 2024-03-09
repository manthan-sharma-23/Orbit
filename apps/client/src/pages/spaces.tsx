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
import { TypographyH2 } from "@/components/ui/typography/h2";
import { BellRing, ListFilter, Plus } from "lucide-react";

const Spaces = () => {
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
              onValueChange={(e) => {
                console.log(e);
              }}
            >
              <SelectTrigger className="w-[55%] h-[6vh] py-3 ">
                <SelectValue defaultChecked={true} defaultValue={"orbit_inc"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="orbit_inc">
                  <div className="flex justify-start items-center w-auto">
                    <img
                      src={"/channel_icons/01.jpg"}
                      className="h-[4vh] w-[4vh] rounded-full border-[1px] border-black"
                    />
                    <p className="w-auto h-[4vh] flex justify-start items-center ml-3 text-lg font-medium">
                      Orbit Inc
                    </p>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <section className="w-[45%] h-[6vh] py-3 flex justify-end gap-4 pr-4 items-center">
              <ListFilter className="border-[1px] border-black/20 text-black/60 hover:text-black/85 h-[4.5vh] w-[4.5vh] p-2 rounded-md cursor-pointer hover:bg-black/15" />
              <BellRing className="border-[1px] border-black/20 text-black/60 hover:text-black/85 h-[4.5vh] w-[4.5vh] p-2 rounded-md cursor-pointer hover:bg-black/15" />
              <Plus className="border-[1px] border-black/20 text-black/60 hover:text-black/85 h-[4.5vh] w-[4.5vh] p-2 rounded-md cursor-pointer hover:bg-black/15" />
            </section>
          </nav>
          <Separator className="bg-black/10" />
          <section className="h-[92vh]"></section>
        </ResizablePanel>
        <ResizableHandle withHandle className="border-0" />
        <ResizablePanel className="border-0">Two</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Spaces;
