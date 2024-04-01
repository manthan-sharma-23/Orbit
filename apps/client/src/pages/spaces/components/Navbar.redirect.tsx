import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { spaceNavAtom } from "@/features/store/atoms/navbar/spaces/space.nav.atom";
import { FaRegSquare } from "react-icons/fa6";
import { GiSewingString } from "react-icons/gi";
import { IoSearchOutline } from "react-icons/io5";
import { MdGroup, MdTaskAlt } from "react-icons/md";
import { Link, useLocation, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const NavbarRedirect = () => {
  const nav = useRecoilValue(spaceNavAtom);

  if (nav === "townhall") {
    return <TownHallNavbar />;
  }
  if (nav === "team") {
    return <TeamNavbar />;
  }
  return <div></div>;
};

export const TeamNavbar = () => {
  const { spaceId, teamId } = useParams();
  const { pathname } = useLocation();

  return (
    <div className="h-full w-full flex justify-between items-center">
      <NavigationMenu className="h-full items-end gap-3 flex w-auto">
        <NavigationMenuList className="w-full h-full bg-transparent p-0 text-white/85">
          <NavigationMenuItem className="">
            <Link to={`/home/spaces/${spaceId}/team/${teamId}/threads`}>
              <NavigationMenuLink className=" w-auto justify-between bg-transparent hover:bg-yellow-300 text-[1rem] font-sans">
                <div
                  className={`flex  pb-2 gap-1 ${pathname.startsWith(`/home/spaces/${spaceId}/team/${teamId}/threads`) && "border-yellow-500 border-b-2 text-white"} h-[3rem] px-3 justify-start items-center pr-[4rem] hover:opacity-70`}
                >
                  <GiSewingString />
                  <p>Threads</p>
                </div>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="h-full">
            <Link
              to={`/home/spaces/${spaceId}/team/${teamId}/members`}
              className="h-full"
            >
              <NavigationMenuLink className="h-full w-auto justify-between bg-transparent hover:bg-yellow-300 text-[1rem] font-sans">
                <div
                  className={`flex pb-2 mx-2  ${pathname.startsWith(`/home/spaces/${spaceId}/team/${teamId}/members`) && "border-pink-400 px-3 border-b-2 text-white"} h-[3rem] px-3 gap-1 justify-start items-center pr-[4rem] hover:opacity-70`}
                >
                  <MdGroup />
                  <p>Members</p>
                </div>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="">
            <Link to={`/home/spaces/${spaceId}/team/${teamId}/tasks`}>
              <NavigationMenuLink className=" w-auto justify-between bg-transparent hover:bg-yellow-300 text-[1rem] font-sans">
                <div
                  className={`flex  pb-2 ${pathname.startsWith(`/home/spaces/${spaceId}/team/${teamId}/tasks`) && "border-purple-400  border-b-2 text-white"} h-[3rem] px-3 gap-1 justify-start items-center pr-[4rem] hover:opacity-70`}
                >
                  <MdTaskAlt />
                  <p>Tasks</p>
                </div>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="">
            <Link to={`/home/spaces/${spaceId}/team/${teamId}/canvas`}>
              <NavigationMenuLink className=" w-auto justify-between bg-transparent hover:bg-yellow-300 text-[1rem] font-sans">
                <div
                  className={`flex  pb-2 ${pathname.startsWith(`/home/spaces/${spaceId}/team/${teamId}/canvas`) && "border-cyan-400  border-b-2 text-white"} h-[3rem] px-3 gap-1 justify-start items-center pr-[4rem] hover:opacity-70`}
                >
                  <FaRegSquare />
                  <p>Canvas</p>
                </div>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="w-auto h-full flex justify-center items-center pr-5">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button>
              <img src={""} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export const TownHallNavbar = () => {
  const { spaceId } = useParams();
  const { pathname } = useLocation();

  return (
    <div className="h-full w-full">
      <NavigationMenu className="h-full items-end gap-3 flex w-auto">
        <NavigationMenuList className="w-full h-full bg-transparent p-0 text-white/85">
          <NavigationMenuItem className="">
            <Link to={`/home/spaces/${spaceId}/townhall/threads`}>
              <NavigationMenuLink className=" w-auto justify-between bg-transparent hover:bg-yellow-300 text-[1rem] font-sans">
                <div
                  className={`flex  pb-2 gap-1 ${pathname.startsWith(`/home/spaces/${spaceId}/townhall/threads`) && "border-yellow-500 border-b-2 text-white"} h-[3rem] px-3 justify-start items-center pr-[4rem] hover:opacity-70`}
                >
                  <GiSewingString />
                  <p>Threads</p>
                </div>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="h-full">
            <Link
              to={`/home/spaces/${spaceId}/townhall/invite`}
              className="h-full"
            >
              <NavigationMenuLink className="h-full w-auto justify-between bg-transparent hover:bg-yellow-300 text-[1rem] font-sans">
                <div
                  className={`flex pb-2 mx-2  ${pathname.startsWith(`/home/spaces/${spaceId}/townhall/invite`) && "border-pink-400 px-3 border-b-2 text-white"} h-[3rem] px-3 gap-1 justify-start items-center pr-[4rem] hover:opacity-70`}
                >
                  <IoSearchOutline />
                  <p>Find Teammates</p>
                </div>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="">
            <Link to={`/home/spaces/${spaceId}/townhall/canvas`}>
              <NavigationMenuLink className=" w-auto justify-between bg-transparent hover:bg-yellow-300 text-[1rem] font-sans">
                <div
                  className={`flex  pb-2 ${pathname.startsWith(`/home/spaces/${spaceId}/townhall/canvas`) && "border-cyan-400  border-b-2 text-white"} h-[3rem] px-3 gap-1 justify-start items-center pr-[4rem] hover:opacity-70`}
                >
                  <FaRegSquare />
                  <p>Canvas</p>
                </div>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavbarRedirect;
