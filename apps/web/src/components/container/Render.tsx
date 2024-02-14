import React from "react";
import { useGetUser } from "../../features/hooks/useGetUser.hook";

function Render({ children }: { children: React.ReactNode }) {
  useGetUser();
  return <div className="h-screen w-screen bg-black/60">{children}</div>;
}

export default Render;
