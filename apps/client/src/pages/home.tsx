import { useParams } from "react-router-dom";
import Inbox from "./inbox";

const Home = () => {
  const { path } = useParams();

  if (path === "inbox") {
    return <Inbox />;
  }

  return <div>Nothing to be shown here</div>;
};

export default Home;
