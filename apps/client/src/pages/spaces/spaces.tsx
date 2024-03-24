import { Outlet, useNavigate, useParams } from "react-router-dom";

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
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { selectedSpaceAtom } from "@/features/store/atoms/spaces/spaceId.atom";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Loading from "@/components/ui/Loading";
import { Button } from "@/components/ui/button";
import * as Radio from "@radix-ui/react-radio-group";
import { Settings } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Spaces = () => {
  const { spaceId } = useParams();

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
      <div className="h-[92vh] w-full ">
        {spaceId && spaceId !== "null" ? <Outlet /> : <EmptySpacePannel />}
      </div>
    </div>
  );
};

const EmptySpacePannel = () => {
  const { loading, spaces } = useGetUserSpaces();
  const [Id, setId] = useState<string | null>(null);
  const setSpaceId = useSetRecoilState(selectedSpaceAtom);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="h-full w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="h-[70%] w-[40%]">
        <TypographyH2 text={"No Space Selected"} />
        <TypographyH3
          text={"Please select one to continue :"}
          className="text-[1.3rem] font-light text-white/60"
        />
        <div className="border-0 p-3 w-[60%] h-auto ml-[5vw]">
          <RadioGroup
            className="my-3"
            defaultValue={Id || " "}
            value={Id || " "}
            onValueChange={(v) => setId(v)}
          >
            {spaces.map((space) => (
              <div className="flex flex-col items-start gap-[4px] space-x-2 mb-2 ">
                <div className="flex gap-2">
                  <RadioGroupItem
                    value={space.space.id}
                    id={space.space.id}
                    className="border-white/80 text-white  mt-1 cursor-pointer"
                    aria-checked="true"
                    typeof="circle"
                    type="button"
                  >
                    <Radio.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-violet11" />
                  </RadioGroupItem>
                  <Label
                    htmlFor={space.space.id}
                    className="text-lg font-mono font-semibold cursor-pointer"
                  >
                    {space.space.name}
                  </Label>
                </div>
                <p className="pl-3 text-white/50">{space.space.description}</p>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="w-[50%] h-auto flex justify-end items-center">
          <Button
            className="bg-white/90 hover:bg-white/70 text-black"
            onClick={() => {
              if (!Id) return;
              setSpaceId({ id: Id });
              navigate(`/home/spaces/${Id}`);
            }}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

const SpaceSelect = () => {
  const { spaces } = useGetUserSpaces();
  const navigate = useNavigate();
  const [spaceId, setSpaceId] = useRecoilState(selectedSpaceAtom);

  const handleSpaceSelect = (selectedSpaceId: string) => {
    setSpaceId({ id: selectedSpaceId });
    navigate(`/home/spaces/${selectedSpaceId}`);
  };

  return (
    <div className="flex gap-2 justify-center items-center w-auto ml-4">
      <Select
        onValueChange={handleSpaceSelect}
        defaultValue={spaceId.id || ""}
        value={spaceId.id || ""}
      >
        <SelectTrigger className="min-w-[14rem] h-[2.5rem] border-white/50">
          <SelectValue placeholder="Select a Space" />
        </SelectTrigger>
        <SelectContent className="bg-black border-white/40" position="popper">
          {spaces &&
            spaces.map((space) => (
              <SelectItem
                key={space.spaceId}
                value={space.spaceId}
                className="flex justify-start items-center gap-2 bg-black text-white hover:bg-black cursor-pointer rounded-lg"
              >
                <div className="flex justify-start items-center px-2 gap-2 text-lg text-white/70">
                  <p className="h-4 w-4 rounded-full overflow-hidden inline-block">
                    {space.space.image ? (
                      <img src={space.space.image} alt="space" />
                    ) : (
                      <div className="h-full w-full bg-violet-400" />
                    )}
                  </p>
                  <div className="mr-5">{space.space.name}</div>
                </div>
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      <div className="border-[0px] border-gray-100/55 h-[2.5rem] w-[3rem] text-lg flex justify-center hover:bg-white/20 hover:text-white cursor-pointer items-center  text-white/70 rounded-md">
        <Sheet>
          <SheetTrigger>
            <Settings />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Spaces;
