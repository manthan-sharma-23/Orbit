import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Render from "./components/container/Render";
import AppLayout from "./components/layouts/AppLayout";
import HomePage from "./pages/HomePage";
import ChatLayout from "./components/layouts/ChatLayout";
import ChatPage from "./pages/ChatPage";
import Signout from "./pages/auth/Signout";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import AuthLayout from "./components/layouts/AuthLayout";
import GlobalPage from "./pages/GlobalPage";
import DMPage from "./pages/DMPage";
import DMLayout from "./components/layouts/DMLayout";

function App() {
  return (
    <RecoilRoot>
      <Render>
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="/auth/signin" element={<Signin />} />
              <Route path="/auth/signup" element={<Signup />} />
              <Route path="/auth/signout" element={<Signout />} />
            </Route>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/global" element={<GlobalPage />} />
              <Route path="/dms" element={<DMLayout />}>
                <Route path="/dms/:roomId/:userId" element={<DMPage />} />
              </Route>
              <Route path="/chat" element={<ChatLayout />}>
                <Route index element={<ChatPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Render>
    </RecoilRoot>
  );
}

export default App;
