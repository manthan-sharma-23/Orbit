import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useGetUserSpaces } from "@/features/hooks/spaces/useGetUserSpaces";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSetRecoilState } from "recoil";
import { useState } from "react";
import { selectedSpaceAtom } from "@/features/store/atoms/spaces/spaceId.atom";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateSpace from "./components/createSpace";

const Spaces = () => {
  const { spaceId } = useParams();
  console.log(spaceId);

  return (
    <div
      className="h-full w-full p-0 bg-[#0F0F0F] text-white"
      style={{ fontFamily: ' "Kode Mono", monospace' }}
    >
      {spaceId && spaceId !== "null" ? <Outlet /> : <SelectSpace />}
    </div>
  );
};

const SelectSpace = () => {
  const { loading, spaces } = useGetUserSpaces();
  const [Id, setId] = useState<string | null>(null);
  const setSpaceId = useSetRecoilState(selectedSpaceAtom);
  const navigate = useNavigate();
  return (
    <div className="h-full w-full flex justify-center items-center py-10">
      <div className="h-full w-1/3 flex justify-center items-center text-4xl flex-col text-white/70 gap-2">
        <p className="w-auto text-4xl text-whiten font-extrabold text-white/90 ">
          WELCOME TO ORBIT SPACES
        </p>
        <p className="w-auto text-2xl text-white/65 font-bold ">
          WHERE WORLDS COLLIDE
        </p>
      </div>
      <Separator orientation="vertical" className="bg-white/10" />
      <div className="h-full w-2/3 flex justify-center items-center">
        <div className="w-[70%] min-h-[60vh] flex justify-center items-center flex-col">
          <h2 className="text-2xl font-semibold h-auto w-full flex justify-center items-center">
            SELECT OR CREATE A SPACE TO CONTINUE
          </h2>
          <div className="border-0 p-3 w-[60%] h-auto ml-[5vw]">
            <RadioGroup
              className="my-3"
              defaultValue={Id || " "}
              value={Id || " "}
              onValueChange={(v) => setId(v)}
            >
              {!loading && spaces.length > 0 ? (
                spaces.map((space) => (
                  <div className="flex flex-col items-start gap-[4px] space-x-2 mb-2 ">
                    <div className="flex gap-2">
                      <RadioGroupItem
                        value={space.space.id}
                        id={space.space.id}
                        className="border-white/80 text-white  mt-1 cursor-pointer"
                        aria-checked="true"
                        typeof="circle"
                        type="button"
                      ></RadioGroupItem>
                      <Label
                        htmlFor={space.space.id}
                        className="text-lg font-mono font-semibold cursor-pointer"
                      >
                        {space.space.name}
                      </Label>
                    </div>
                    <p className="pl-3 text-white/50">
                      {space.space.description.length > 100
                        ? space.space.description.slice(0, 100) + "..."
                        : space.space.description}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-white/50">
                  No Spaces to Select Please create One
                </p>
              )}
            </RadioGroup>
          </div>
          <div className="w-full h-auto flex justify-center gap-4 items-center text-xl">
            <Dialog>
              <DialogTrigger>
                <Button className="bg-transparent hover:bg-white/95 text-white/85 hover:text-black">
                  CREATE SPACE
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#0F0F0F] text-white h-auto w-full border-none">
                <CreateSpace />
              </DialogContent>
            </Dialog>
            <Button
              disabled={spaces.length < 1}
              className="bg-white/90 hover:bg-white/70 text-black"
              onClick={() => {
                if (!Id) return;
                window.localStorage.setItem("spaceId", Id);
                // setSpaceId({ id: Id });
                navigate(`/home/spaces/${Id}`);
              }}
            >
              CONTINUE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spaces;
