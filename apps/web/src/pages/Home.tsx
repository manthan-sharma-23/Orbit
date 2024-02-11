import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userNameSelector } from "../features/store/selectors/user.selector";
import { useGetUser } from "../features/hooks/getUsr.hook";

const Home = () => {
  const isLoading = useGetUser();
  const username = useRecoilValue(userNameSelector);

  console.log(isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-full flex text-black">
      <p className="w-full h-full flex items-center justify-center text-4xl font-bold">
        {username ? username : "Home"}
      </p>

      <Outlet />
    </div>
  );
};

export default Home;
