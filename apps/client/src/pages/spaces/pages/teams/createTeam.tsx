import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ChromePicker, ColorResult } from 'react-color';


const CreateTeam = () => {
  const [color, setColor] = useState<string>("#ffffff"); // Initial color state

  const handleColorChange = (updatedColor: ColorResult) => {
    const hexColor: string = updatedColor.hex; // Extract hex color
    setColor(hexColor); // Update the color state
    // Do whatever you need with the hex color, like passing it to a parent component or storing it in state.
    console.log("Selected color hex code:", hexColor);
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
            className="border-[.6px] border-white/60 focus-visible:ring-[2.5px]  focus-within:border-blue-400/80 focus-visible:ring-blue-600/40 bg-white/5  rounded-xs "
            placeholder="Enter Team Name"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label className="font-sans text-white/70">
            Pick a color Identifier
          </Label>
          <ChromePicker color={color} onChange={handleColorChange} />
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
