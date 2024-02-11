import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="text-black h-screen w-screen border-">
      Hello
      <Outlet />
    </div>
  );
};

export default AppLayout;
