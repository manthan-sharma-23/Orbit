import { useParams } from "react-router-dom";

const Home = () => {
  const { path } = useParams();

  return <div className="bg-black w-full h-full">Nothing to be shown here</div>;
};

export default Home;
