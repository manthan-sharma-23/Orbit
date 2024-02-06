import { Outlet } from "react-router-dom";
import { useGetWebSocketMessagesQuery } from "../features/store/rtk-query/ws.api";
import { useGetUserQuery } from "../features/store/rtk-query/user.api";

const Home = () => {
  const { isLoading } = useGetWebSocketMessagesQuery({});
  const user = useGetUserQuery();

  // console.log(data);

  if (isLoading) {
    return <div>Loading....</div>;
  }

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
