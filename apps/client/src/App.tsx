import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthenticationLayout from "./components/layouts/AuthenticationLayout";
import { SignIn } from "./components/authentication/signin";
import { SignUp } from "./components/authentication/signup";
import { Signout } from "./components/authentication/signout";
import Home from "./pages/home";
import ApplicationLayout from "./components/layouts/ApplicationLayout";
import RootLayout from "./components/layouts/RootLayout";
import Spaces from "./pages/spaces/spaces";
import { Thread } from "./pages/threads/thread";
import Inbox from "./pages/inbox/inbox";

function App() {
  return (
    <div className="h-screen w-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route path="/home" element={<ApplicationLayout />}>
              <Route path="/home/spaces/:spaceId" element={<Spaces />}>
                <Route
                  path="/home/spaces/:spaceId/threads/:threadId"
                  element={<Thread />}
                />
              </Route>
              <Route path="/home/inbox" element={<Inbox />}>
                <Route path="/home/inbox/:mailId" element={<Inbox />} />
              </Route>
              <Route path="/home/:path" element={<Home />} />
            </Route>
            <Route path="/auth" element={<AuthenticationLayout />}>
              <Route path="/auth/signin" element={<SignIn />} />
              <Route path="/auth/signup" element={<SignUp />} />
              <Route path="/auth/signout" element={<Signout />} />
            </Route>
          </Route>
          Home
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
