import Loading from "@/components/ui/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createThread } from "@/features/funcs/threads/createThread";
import { THREAD_TYPES } from "@/lib/types/type";
import { useState } from "react";

interface CreateThread {
  name: string;
  type: string;
}

const CreateThread = ({ teamId }: { teamId: string }) => {
  console.log(teamId);
  const [thread, setThread] = useState<CreateThread>({
    name: "",
    type: THREAD_TYPES.CHAT,
  });

  const [loading, setLoading] = useState(false);

  const createThreadHandler = () => {
    if (teamId && thread.name) {
      setLoading(true);
      createThread({ ...thread, teamId })
        .then(() => {
          setLoading(false);
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div
      className="h-full w-full bg-[#0F0F0F] text-white p-4   overflow-hidden"
      style={{
        fontFamily: '"Kode Mono", monospace',
        borderRadius: "2px",
      }}
    >
      <p className="text-xl font-semibold">&#47;&#47;&#32;CREATE&#32;THREAD</p>
      <div className=" h-full w-full  mt-7 flex flex-col gap-4 justify-start items-center">
        <div className="w-full flex flex-col gap-2">
          <Label className="font-sans text-white/70">Thread Name</Label>
          <Input
            disabled={loading}
            className="font-sans border-[.6px] border-white/60 focus-visible:ring-[2.5px]  focus-within:border-blue-400/80 focus-visible:ring-blue-600/40 bg-white/5  rounded-xs "
            placeholder="Enter Team Name"
            value={thread.name}
            onChange={(e) => setThread((v) => ({ ...v, name: e.target.value }))}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label className="font-sans text-white/70">Team Id</Label>
          <Input
            disabled={true}
            className="font-sans bg-yellow-200/20 border-[.6px] border-white/60  rounded-xs "
            placeholder="Enter Team Name"
            value={teamId}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label className="font-sans text-white/70">Thread Type</Label>

          <Select
            onValueChange={(value) => {
              setThread((v) => ({ ...v, type: value }));
            }}
            value={thread.type}
          >
            <SelectTrigger
              disabled={loading}
              className=" font-medium border-[.6px] border-white/60 focus-within:ring-[2.5px] focus-within:border-blue-400/80 focus:ring-3 focus:ring-blue-600/40 bg-white/5  rounded-xs "
            >
              <SelectValue
                placeholder="Select type of forum"
                className="text-white"
              />
            </SelectTrigger>
            <SelectContent className="font-sans bg-[#1B1B1B] text-white/80 border-[.6px] ring-[2px] rounded-none border-blue-400/80 ring-blue-600/40">
              <SelectGroup className="cursor-pointer">
                <SelectItem value={THREAD_TYPES.CHAT}>Chat</SelectItem>
                <SelectItem value={THREAD_TYPES.ANNOUNCEMENT}>
                  Announcement
                </SelectItem>
                <SelectItem value={THREAD_TYPES.AUDIO}>Audio</SelectItem>
                <SelectItem value={THREAD_TYPES.VIDEO}>Video</SelectItem>
                <SelectItem value={THREAD_TYPES.JAM}>Jam</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full flex justify-end items-center mb-3">
          <Button
            onClick={createThreadHandler}
            disabled={loading}
            className=" w-[8rem] bg-white text-black hover:bg-transparent hover:text-white/80 font-semibold"
          >
            {loading ? <Loading /> : "CREATE THREAD"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateThread;
