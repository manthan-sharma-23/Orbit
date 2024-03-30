import Loading from "@/components/ui/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createTeam } from "@/features/funcs/teams/createTeam";
import { TEAM_TYPE } from "@/lib/types/type";
import { useState } from "react";
import { ChromePicker, ColorResult } from "react-color";
import { useParams } from "react-router-dom";

interface CreateTeam {
  name: string;
  description?: string;
  type: string;
}

const CreateTeam = () => {
  const { spaceId } = useParams();

  const [color, setColor] = useState<string>(""); // Initial color state
  const [team, setTeam] = useState<CreateTeam>({
    name: "",
    description: "",
    type: TEAM_TYPE.inviteOnly,
  });
  const [loading, setLoading] = useState(false);

  const handleColorChange = (updatedColor: ColorResult) => {
    const hexColor: string = updatedColor.hex; // Extract hex color
    setColor(hexColor); // Update the color state
    // Do whatever you need with the hex color, like passing it to a parent component or storing it in state.
    console.log("Selected color hex code:", hexColor);
  };

  const createTeamHandler = () => {
    if (spaceId && team.name) {
      setLoading(true);
      createTeam({ ...team, color, spaceId })
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
      className="h-full w-full bg-[#0F0F0F] text-white"
      style={{
        fontFamily: '"Kode Mono", monospace',
        borderRadius: "2px",
      }}
    >
      <p className="text-xl font-semibold">&#47;&#47;&#32;CREATE TEAM</p>
      <div className=" h-full w-full  mt-7 flex flex-col gap-4 justify-start items-center">
        <div className="w-full flex flex-col gap-2">
          <Label className="font-sans text-white/70">Team Name</Label>
          <Input
            disabled={loading}
            className="font-sans border-[.6px] border-white/60 focus-visible:ring-[2.5px]  focus-within:border-blue-400/80 focus-visible:ring-blue-600/40 bg-white/5  rounded-xs "
            placeholder="Enter Team Name"
            value={team.name}
            onChange={(e) => setTeam((v) => ({ ...v, name: e.target.value }))}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label className="font-sans text-white/70">
            Pick a color Identifier
          </Label>
          <div className="flex gap-1">
            <Input
              disabled={loading}
              className="font-sans w-full border-[.6px] border-white/60 focus-visible:ring-[2.5px]  focus-within:border-blue-400/80 focus-visible:ring-blue-600/40 bg-white/5  rounded-xs "
              placeholder="Enter Color HexCode"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />
            <Popover>
              <PopoverTrigger disabled={loading} className="w-11 h-full">
                <div
                  style={{
                    backgroundColor: color,
                    opacity: loading ? ".4" : "1",
                  }}
                  className="w-full h-full  cursor-pointer hover:border hover:border-gray-400 border-2 border-white/60 rounded-md"
                />
              </PopoverTrigger>
              <PopoverContent className="bg-[#0F0F0F] border-0 text-white p-0 w-auto">
                <ChromePicker color={color} onChange={handleColorChange} />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label className="font-sans text-white/70">Team Description</Label>
          <Textarea
            disabled={loading}
            className="font-sans h-[7rem] border-[.6px] border-white/60 focus-visible:ring-[2.5px]  focus-within:border-blue-400/80 focus-visible:ring-blue-600/40 bg-white/5  rounded-xs "
            placeholder="Enter Team Name"
            onChange={(e) =>
              setTeam((v) => ({ ...v, description: e.target.value }))
            }
            value={team.description}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label className="font-sans text-white/70">Team Description</Label>

          <Select
            onValueChange={(value) => {
              setTeam((v) => ({ ...v, type: value }));
            }}
            value={team.type}
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
                <SelectItem value={TEAM_TYPE.inviteOnly}>
                  Invite Only
                </SelectItem>
                <SelectItem value={TEAM_TYPE.public}>Public</SelectItem>
                <SelectItem value={TEAM_TYPE.private}>Private</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full flex justify-end items-center">
          <Button
            onClick={createTeamHandler}
            disabled={loading}
            className=" w-[8rem] bg-white text-black hover:bg-transparent hover:text-white/80 font-semibold"
          >
            {loading ? <Loading /> : "CREATE TEAM"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
