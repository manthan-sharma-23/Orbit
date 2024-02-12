import { Outlet } from "react-router-dom";
import bg from "../../assets/bg.jpg";
import "../../styles/globals.css";

const AppLayout = () => {
  return (
    <div className="text-black h-screen w-screen overflow-hidden flex justify-center bg-black items-center">
      <img src={bg} className="bg-image h-full w-full" />
      <div className="h-full w-full bg-transparent p-3">
        <div className="h-full w-[6vw] bg-white/40 rounded-2xl flex justify-start flex-col items-center p-1">
          Hello
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default AppLayout;
