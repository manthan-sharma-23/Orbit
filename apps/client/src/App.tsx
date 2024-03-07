import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthenticationLayout from "./components/layouts/AuthenticationLayout";
import { SignIn } from "./components/authentication/singin";
import { SignUp } from "./components/authentication/signup";
import { Signout } from "./components/authentication/signout";
import Home from "./pages/home";
import ApplicationLayout from "./components/layouts/ApplicationLayout";

function App() {
  return (
    <div className="h-screen w-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ApplicationLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/auth" element={<AuthenticationLayout />}>
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="/auth/signout" element={<Signout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
