import Auth from "../components/containers/Auth";
import { useLocation } from "react-router-dom";

const Signinup = () => {
  const path = useLocation().pathname;
  return (
    <div>
      <Auth page={path} />
    </div>
  );
};

export default Signinup;
