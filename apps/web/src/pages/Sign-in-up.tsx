import AuthLayout from "../components/layouts/AuthLayout";
import { useLocation } from "react-router-dom";

const Signinup = () => {
  const path = useLocation().pathname;
  return (
    <div>
      <AuthLayout page={path} />
    </div>
  );
};

export default Signinup;
