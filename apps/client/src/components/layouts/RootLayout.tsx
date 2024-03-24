import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "../ui/toaster";

const RootLayout = () => {
  return (
    <div className="h-full w-full ">
      <Outlet />
      <Toaster />
    </div>
  );
};

export default RootLayout;
