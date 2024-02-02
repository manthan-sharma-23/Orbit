import Sidebar from "../components/containers/Sidebar";
import { useGetUserQuery } from "../lib/store/reducers/slice/user.slice";

const Home = () => {
  const { data, isLoading, isError } = useGetUserQuery();

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <div className="h-screen w-screen flex text-black">
      <Sidebar />
      <p className="w-full h-full flex items-center justify-center text-4xl font-bold">
        {data?.user.name}
      </p>
    </div>
  );
};

export default Home;
