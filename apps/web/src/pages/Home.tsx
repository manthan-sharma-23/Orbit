import { Outlet } from "react-router-dom";
import { useGetUserQuery } from "../features/store/rtk-query/user.api";

const Home = () => {
  const user = useGetUserQuery();

  return (
    <div className="h-screen w-full flex text-black">
      <p className="w-full h-full flex items-center justify-center text-4xl font-bold">
        {user.data?.user ? user.data.user.name : "Home"}
      </p>

      <Outlet />
    </div>
  );
};

export default Home;
