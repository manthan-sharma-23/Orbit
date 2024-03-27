import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { userAtom } from "@/features/store/atoms/user.atom";
import React, { useState } from "react";
import { MdOutlineWork } from "react-icons/md";
import {
  FaCode,
  FaGithub,
  FaLinkedin,
  FaLinkedinIn,
  FaUser,
  FaXTwitter,
} from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaBirthdayCake } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import { useGetCountries } from "@/features/hooks/helpers/useGetCountries";
import { IoLocationSharp } from "react-icons/io5";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { USER } from "typings";
import { updateUser } from "@/features/funcs/user/update.user";
import Loading from "@/components/ui/Loading";
import { useNavigate } from "react-router-dom";

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosGlobe } from "react-icons/io";
import { Languages } from "@/lib/locales/lang";
import {
  commonComputerScienceSkills,
  commonSoftwareEngineeringRoles,
} from "@/lib/static/global/static/roles.list";
import { useGetUser } from "@/features/hooks/root/useGetUser";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const EditProfile = () => {
  const [{ user }, setUser] = useRecoilState(userAtom);
  const [userUpdationDetails, setUserUpdationDetails] = useState<USER>(
    user as USER
  );
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const countries = useGetCountries();
  const [languages, setLanguages] = useState<string[]>(user?.languages || []);
  const [roles, setRoles] = useState<string[]>(user?.roles || []);
  const [skills, setSkills] = useState<string[]>(user?.skills || []);

  if (user === null) {
    return;
  }

  const handleLanguageChange = (language: string) => {
    if (languages.includes(language)) {
      setLanguages((prevLanguages) =>
        prevLanguages.filter((lang) => lang !== language)
      );
    } else {
      setLanguages((prevLanguages) => [...prevLanguages, language]);
      setUserUpdationDetails((v) => ({ ...v, languages }));
    }
  };

  const handleRolesChange = (role: string) => {
    if (roles.includes(role)) {
      setRoles((prevRoles) => prevRoles.filter((role) => role !== role));
    } else {
      setRoles((prevRoles) => [...prevRoles, role]);
    }
  };

  const handleSkillsChange = (skill: string) => {
    if (skills.includes(skill)) {
      setSkills((prevSkills) =>
        prevSkills.filter((Inskill) => Inskill !== skill)
      );
    } else {
      setSkills((prevSkills) => [...prevSkills, skill]);
    }
  };

  const handleUpdate = () => {
    setLoading(true);
    updateUser({ ...userUpdationDetails, languages, roles, skills })
      .then((data) => {
        setLoading(false);
        navigate("/home/globe/profile");
        if (data) setUser({ user: data, loading: false });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div
      className="h-full w-full flex justify-start p-5 items-center"
      style={{ fontFamily: ' "Kode Mono", monospace' }}
    >
      <ScrollArea className="h-full w-full">
        <div className="w-[70%] h-full">
          <div className="h-auto px-2 py-2 rounded-sm w-full flex text-xl gap-3 mb-2 bg-white/5">
            <p className="font-bold text-white/85">/// EDIT PROFILE</p>
            <p className="text-white/10">
              ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
            </p>
          </div>
          <div className="h-[18vh] w-full flex justify-center items-center gap-4 mb-5">
            <span className="h-[9rem] w-[8rem] cursor-pointer  ">
              <div className="h-[7.8rem] w-[7.8rem]  flex flex-col justify-center items-center border-[1px] border-white/10">
                <img
                  src={userUpdationDetails?.image}
                  className="h-[7rem] w-[7rem] overflow-hidden"
                />
              </div>
              <p className="hover:bg-white/10 tracking-wide h-[2rem] font-semibold w-[7.8rem] text-sm flex justify-center items-center border border-t-0 border-white/10">
                AVATAR
              </p>
            </span>
            <div className=" h-[9.6rem] w-full relative top-2 flex flex-col justify-around items-center">
              <Input
                className="border-[.6px] disabled:bg-blue-500/10 border-white/60 focus-visible:ring-[2.5px] focus-within:border-[#849DFE] focus-visible:ring-[#131620]   rounded-sm "
                placeholder="Name"
                value={userUpdationDetails?.name}
                disabled
              />
              <div className="flex w-full">
                <p className="h-full w-[3.4rem] flex items-center justify-center text-2xl bg-white/10 border border-r-0 border-white/30 text-white/50">
                  @
                </p>
                <Input
                  className="border-[.6px] border-white/40 focus-visible:ring-[2.5px] focus-within:border-[#849DFE] focus-visible:ring-[#131620] bg-white/5  rounded-sm "
                  placeholder="Username"
                  value={userUpdationDetails?.username}
                  onChange={(e) => {
                    setUserUpdationDetails((v) => ({
                      ...v,
                      username: e.target.value,
                    }));
                  }}
                />
                <Button className="bg-blue-700/30 rounded-none">
                  CHECK AVAILIBILITY
                </Button>
              </div>
              <Input
                className="border-[.6px] disabled:bg-blue-500/10 border-white/60 focus-visible:ring-[2.5px] focus-within:border-[#849DFE] focus-visible:ring-[#131620]   rounded-sm "
                placeholder="Email"
                value={userUpdationDetails?.email}
                disabled
              />
            </div>
          </div>
          <Separator className="my-5 bg-white/10" />
          <div className="w-full ">
            <p className="text-lg font-medium mb-2 w-[30%]">&#62; ABOUT ME</p>
            <Textarea
              className="mb-2 min-h-[9rem] max-h-[9rem] overflow-hidden border-[.6px] border-white/30 focus-visible:ring-[2.5px] focus-within:border-blue-400/80 focus-visible:ring-blue-600/40 bg-white/5 rounded-xs"
              style={{ height: "auto", resize: "none" }} // Added style attribute
              placeholder="About Me Section"
              value={userUpdationDetails?.about}
              onChange={(e) => {
                setUserUpdationDetails((v) => ({
                  ...v,
                  about: e.target.value,
                }));
              }}
            />
            <div className=" h-auto w-full mb-2 flex gap-3">
              <div className="h-auto w-1/3 flex">
                <p className="p-[10px] h-[2.3rem] w-[2.3rem] flex items-center justify-center text-2xl bg-white/10 border border-r-0 border-white/30 text-white/50">
                  <FaUser />
                </p>
                <Select
                  defaultValue={userUpdationDetails?.stage}
                  onValueChange={(value) =>
                    setUserUpdationDetails((v) => ({
                      ...v,
                      stage: value,
                    }))
                  }
                >
                  <SelectTrigger
                    defaultValue={userUpdationDetails?.stage}
                    className="h-[2.3rem] border-[.6px] border-white/40 focus-visible:ring-[2.5px] focus-within:border-[#849DFE] focus-visible:ring-[#131620] bg-white/5  rounded-sm "
                  >
                    <SelectValue placeholder="Select your Stage" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1B1B1B] border-[1px] rounded-sm border-white/10 text-white/80">
                    <SelectGroup>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="h-auto w-2/3 flex">
                <p className="p-2 h-[2.3rem] w-[2.3rem] flex items-center justify-center text-2xl bg-white/10 border border-r-0 border-white/30 text-white/50">
                  <MdOutlineWork />
                </p>
                <Input
                  className="h-[2.3] border-[.6px] border-white/40 focus-visible:ring-[2.5px] focus-within:border-[#849DFE] focus-visible:ring-[#131620] bg-white/5  rounded-sm "
                  placeholder="Enter your Job title"
                  value={userUpdationDetails?.job}
                  onChange={(e) => {
                    setUserUpdationDetails((v) => ({
                      ...v,
                      job: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
            <div className=" h-auto w-full mb-4 flex gap-3">
              <div className="h-auto w-1/3 flex">
                <p className="p-[10px] h-[2.3rem] w-[2.3rem] flex items-center justify-center text-2xl bg-white/10 border border-r-0 border-white/30 text-white/50">
                  <FaCode />
                </p>
                <Input
                  className="h-[2.3rem] border-[.6px] border-white/40 focus-visible:ring-[2.5px] focus-within:border-[#849DFE] focus-visible:ring-[#131620] bg-white/5  rounded-sm "
                  placeholder="Enter your Work Ex."
                  value={userUpdationDetails?.workEx}
                  onChange={(e) => {
                    setUserUpdationDetails((v) => ({
                      ...v,
                      workEx: Number(e.target.value) || v.workEx,
                    }));
                  }}
                />
              </div>
              <div className="h-[2.3rem] overflow-hidden w-1/3 flex">
                <p className="p-2 h-[2.3rem] w-[2.3rem] flex items-center justify-center text-2xl bg-white/10 border border-r-0 border-white/30 text-white/50">
                  <IoIosGlobe />
                </p>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="rounded-none w-full h-[2.3rem]"
                    asChild
                  >
                    {languages.length > 0 ? (
                      <div className=" gap-2 text-white/70 px-2 flex text-sm justify-start items-center overflow-hidden bg-white/5 border-[1px] border-white/40 cursor-pointer">
                        {languages.map((lang) => (
                          <p>{lang},</p>
                        ))}
                      </div>
                    ) : (
                      <Button
                        variant="default"
                        className="flex justify-start bg-white/5 border-[1px] border-white/60"
                      >
                        Select Languages
                      </Button>
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[17rem] rounded-none bg-[#1B1B1B] text-white">
                    <DropdownMenuLabel className="border-0">
                      Select Languages
                    </DropdownMenuLabel>
                    <ScrollArea className="h-[25vh] w-full">
                      {Languages.map((lang) => (
                        <DropdownMenuCheckboxItem
                          checked={languages.includes(lang)}
                          onCheckedChange={() => handleLanguageChange(lang)}
                        >
                          {lang}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </ScrollArea>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="h-auto w-1/3 flex">
                <p className="p-2 h-[2.3rem] w-[2.3rem] flex items-center justify-center text-2xl bg-white/10 border border-r-0 border-white/30 text-white/50">
                  <IoLocationSharp />
                </p>
                <Select
                  defaultValue={user.country}
                  onValueChange={(value) =>
                    setUserUpdationDetails((v) => ({
                      ...v,
                      country: value,
                    }))
                  }
                >
                  <SelectTrigger
                    defaultValue={user.country}
                    className="h-[2.3rem] border-[.6px] border-white/40 focus-visible:ring-[2.5px] focus-within:border-[#849DFE] focus-visible:ring-[#131620] bg-white/5  rounded-sm "
                  >
                    <SelectValue placeholder="Select your Country" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1B1B1B] border-[1px] rounded-sm border-white/10 text-white/80">
                    <SelectGroup>
                      <SelectItem value={"Anonymous"}>Anonymous</SelectItem>
                      {countries &&
                        countries.map((country) => (
                          <SelectItem value={country.name.common}>
                            {country.name.common}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <Separator className="my-5 bg-white/10" />
          <div className="h-auto w-full">
            <p className="text-lg font-medium mb-2 w-[30%]">&#62; SOCIAL</p>
            <div className="h-auto w-full flex flex-col items-center justify-center gap-3">
              <div className="flex w-full h-[2.5rem]">
                <p className="p-3 h-full w-[2.8rem] flex items-center justify-center text-2xl bg-white/10 border border-r-0 border-white/30 text-white/50">
                  <FaGithub />
                </p>
                <Input
                  className="h-full border-[.6px] border-white/40 focus-visible:ring-[2.5px] focus-within:border-[#849DFE] focus-visible:ring-[#131620] bg-white/5  rounded-sm "
                  placeholder="Enter your Github Profile Url"
                  value={user?.github}
                  onChange={(e) => {
                    setUserUpdationDetails((v) => ({
                      ...v,
                      github: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="flex w-full h-[2.5rem]">
                <p className="p-3 h-full w-[2.8rem] flex items-center justify-center text-2xl bg-white/10 border border-r-0 border-white/30 text-white/50">
                  <FaXTwitter />
                </p>
                <Input
                  className="h-full border-[.6px] border-white/40 focus-visible:ring-[2.5px] focus-within:border-[#849DFE] focus-visible:ring-[#131620] bg-white/5  rounded-sm "
                  placeholder="Enter your X Profile Url"
                  value={user?.twitter}
                  onChange={(e) => {
                    setUserUpdationDetails((v) => ({
                      ...v,
                      twitter: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="flex w-full h-[2.5rem]">
                <p className="p-3 h-full w-[2.8rem] flex items-center justify-center text-2xl bg-white/10 border border-r-0 border-white/30 text-white/50">
                  <FaLinkedinIn />
                </p>
                <Input
                  className="h-full border-[.6px] border-white/40 focus-visible:ring-[2.5px] focus-within:border-[#849DFE] focus-visible:ring-[#131620] bg-white/5  rounded-sm "
                  placeholder="Enter your LinkedIn Profile Url"
                  value={user?.linkedIn}
                  onChange={(e) => {
                    setUserUpdationDetails((v) => ({
                      ...v,
                      linkedIn: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
          </div>
          <Separator className="my-5 bg-white/10" />
          <div className="h-auto w-full">
            <p className="text-lg font-medium mb-2 w-[30%]">&#62; SKILLSET</p>
            <div className="h-auto w-full gap-2 flex flex-wrap justify-start items-center mb-2">
              <div className="h-[2.3rem] overflow-hidden w-full flex">
                <p className="p-2 h-[2.3rem] w-[2.3rem] flex items-center justify-center text-2xl bg-white/10 border border-r-0 border-white/30 text-white/50">
                  <IoIosGlobe />
                </p>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="rounded-none w-full h-[2.3rem]"
                    asChild
                  >
                    {roles.length > 0 ? (
                      <div className="overflow-hidden flex-nowrap gap-2 text-white/70 px-2 flex text-sm justify-start items-center bg-white/5 border-[1px] border-white/40 cursor-pointer">
                        {roles.map((role, index) => (
                          <p key={index} className="whitespace-nowrap">
                            {role},
                          </p>
                        ))}
                      </div>
                    ) : (
                      <Button
                        variant="default"
                        className="flex justify-start bg-white/5 border-[1px] border-white/60"
                      >
                        Select Roles you are Interested In
                      </Button>
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[40rem] rounded-none bg-[#1B1B1B] text-white">
                    <DropdownMenuLabel className="border-0">
                      Select Roles
                    </DropdownMenuLabel>
                    <ScrollArea className="h-[30vh] w-full">
                      {commonSoftwareEngineeringRoles.map((role) => (
                        <DropdownMenuCheckboxItem
                          checked={roles.includes(role)}
                          onCheckedChange={() => handleRolesChange(role)}
                        >
                          {role}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </ScrollArea>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="h-[2.3rem] overflow-hidden w-full flex">
                <p className="p-2 h-[2.3rem] w-[2.3rem] flex items-center justify-center text-2xl bg-white/10 border border-r-0 border-white/30 text-white/50">
                  <IoIosGlobe />
                </p>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="rounded-none w-full h-[2.3rem]"
                    asChild
                  >
                    {skills.length > 0 ? (
                      <div className="overflow-hidden flex-nowrap gap-2 text-white/70 px-2 flex text-sm justify-start items-center bg-white/5 border-[1px] border-white/40 cursor-pointer">
                        {skills.map((skill, index) => (
                          <p key={index} className="whitespace-nowrap">
                            {skill},
                          </p>
                        ))}
                      </div>
                    ) : (
                      <Button
                        variant="default"
                        className="flex justify-start bg-white/5 border-[1px] border-white/60"
                      >
                        Select value you provide
                      </Button>
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[40rem] rounded-none bg-[#1B1B1B] text-white">
                    <DropdownMenuLabel className="border-0">
                      Select Skills
                    </DropdownMenuLabel>
                    <ScrollArea className="h-[30vh] w-full">
                      {commonComputerScienceSkills.map((skill) => (
                        <DropdownMenuCheckboxItem
                          checked={roles.includes(skill)}
                          onCheckedChange={() => handleSkillsChange(skill)}
                        >
                          {skill}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </ScrollArea>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <Separator className="my-5 bg-white/10" />
          <div className="w-full h-auto flex justify-end items-center">
            <Button
              onClick={() => handleUpdate()}
              className="text-[1.25rem]  rounded-none bg-blue-700/30"
            >
              {loading ? <Loading /> : "SAVE"}
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default EditProfile;
