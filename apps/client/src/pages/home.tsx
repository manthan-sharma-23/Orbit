import { useParams } from "react-router-dom";
import Inbox from "./inbox";
import Spaces from "./spaces";

const Home = () => {
  const { path } = useParams();

  if (path === "inbox") {
    return <Inbox />;
  }

  if (path === "spaces") {
    return <Spaces />;
  }

  return <div>Nothing to be shown here</div>;
};

export default Home;
