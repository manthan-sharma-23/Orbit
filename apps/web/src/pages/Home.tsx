import { Outlet } from "react-router-dom";
import { useGetUserQuery } from "../lib/store/rtk-query/user.api";
import { useGetWebSocketMessagesQuery } from "../lib/store/rtk-query/websocket/ws.slice";

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
