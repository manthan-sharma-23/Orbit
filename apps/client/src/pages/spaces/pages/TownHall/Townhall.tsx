import Loading from "@/components/ui/Loading";
import { useGetTownHall } from "@/features/hooks/spaces/useGetTownHall";
import React from "react";
import { useParams } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { NavigationMenuDemo } from "./Navbar";

const Townhall = () => {
  const { spaceId } = useParams();
  const { Townhall, loading } = useGetTownHall();

  if (loading) {
    return (
      <div className="h-full w-full">
        <Loading />
      </div>
    );
  }

  if (Townhall === null)
    return (
      <div className="text-lg text-white h-full w-full flex justify-center items-center">
        No Townhall found for this space
      </div>
    );

  return (
    <div className="h-full w-full flex flex-col justify-start items-center">
      <nav className="h-[6vh] w-full border">
        <NavigationMenuDemo />
      </nav>
    </div>
  );
};

export default Townhall;
