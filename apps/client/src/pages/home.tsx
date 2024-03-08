import { useParams } from "react-router-dom";
import Inbox from "./inbox";

const Home = () => {
  const { path } = useParams();

  if (path === "inbox") {
    return <Inbox />;
  }

  return <div></div>;
};

export default Home;
