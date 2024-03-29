import Loading from "@/components/ui/Loading";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { createSpace } from "@/features/funcs/spaces/createSpace";
import { selectedSpaceAtom } from "@/features/store/atoms/spaces/spaceId.atom";

import { useState } from "react";
import { useSetRecoilState } from "recoil";

interface spaceInput {
  name: string;
  description: string;
}
const CreateSpace = () => {
  const [loading, setLoading] = useState(false);
  const selectSpaceId = useSetRecoilState(selectedSpaceAtom);
  const [spaceDetails, setSpaceDetails] = useState<spaceInput>({
    name: "",
    description: "",
  });

  const createSpaceHandler = async () => {
    console.log("new");
    setLoading(true);
    createSpace(spaceDetails)
      .then((data): void => {
        setLoading(false);
        if (data) {
          window.localStorage.setItem("spaceId", data.space.id);
          // selectSpaceId({})
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="h-full w-full">
      <DialogTitle className="font-mono text-white mb-3">
        CREATE SPACE
      </DialogTitle>
      <DialogDescription>
        <form
          className="h-auto w-full flex flex-col justify-center items-center gap-3 text-white/80"
          onSubmit={() => createSpaceHandler()}
        >
          <Input
            className="border-[.6px] border-white/60 focus-visible:ring-[2.5px]  focus-within:border-blue-400/80 focus-visible:ring-blue-600/40 bg-white/5  rounded-xs "
            placeholder="Enter Space name"
            onChange={(e) => {
              setSpaceDetails((v) => ({ ...v, name: e.target.value }));
            }}
          />

          <Textarea
            className="min-h-[10rem] border-[.6px] border-white/60 focus-visible:ring-[2.5px] focus-within:border-blue-400/80 focus-visible:ring-blue-600/40 bg-white/5 rounded-xs"
            style={{ height: "auto", resize: "vertical" }} // Added style attribute
            placeholder="Enter Space description"
            onChange={(e) => {
              // console.log(e.target.value);
              setSpaceDetails((v) => ({ ...v, description: e.target.value }));
            }}
          />

          <div className="flex justify-end items-center  w-full">
            <Button
              type="submit"
              disabled={loading}
              variant="default"
              className=" bg-blue-600/40 text-blue-400 hover:bg-blue-600/60 h-full w-full flex justify-center items-center gap-1 rounded-sm font-mono text-[1rem]"
              aspect-auto
            >
              {loading ? (
                <Loading />
              ) : (
                <p className="relative top-[1.5px] border-0 h-full  flex items-center justify-center font-mono">
                  CREATE
                </p>
              )}
            </Button>
          </div>
        </form>
      </DialogDescription>
    </div>
  );
};

export default CreateSpace;
