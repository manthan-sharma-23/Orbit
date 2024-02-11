import React from "react";
import { useGetUser } from "../../features/hooks/useGetUser.hook";

function Render({ children }: { children: React.ReactNode }) {
  useGetUser();

  return <div>{children}</div>;
}

export default Render;
