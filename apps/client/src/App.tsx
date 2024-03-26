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
import SpacePannel from "./pages/spaces/spacePannel";
import Global from "./pages/global/global";
import GlobalPannel from "./pages/global/pages/globalPannel";
import ForumsPage from "./pages/global/pages/forum/forumsPage";
import ForumPannel from "./pages/global/pages/forum/forumPannel";
import ForumsList from "./pages/global/pages/forum/forumsList";
import FindMatesPage from "./pages/global/pages/find_users/findMatesPage";
import ProfilePage from "./pages/global/pages/profile/profilePage";
import EditProfile from "./pages/global/pages/profile/editProfile";

function App() {
  return (
    <div className="h-screen w-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route path="/home" element={<ApplicationLayout />}>
              <Route path="/home/globe" element={<Global />}>
                <Route path="/home/globe/forum/" element={<ForumsPage />}>
                  <Route
                    path="/home/globe/forum/:path"
                    element={<ForumsList />}
                  />
                  <Route
                    path="/home/globe/forum/:path/:forumId"
                    element={<ForumPannel />}
                  />
                </Route>
                <Route path="/home/globe/find" element={<FindMatesPage />} />
                <Route path="/home/globe/profile" element={<ProfilePage />} />
                <Route
                  path="/home/globe/profile/edit"
                  element={<EditProfile />}
                />
                <Route path="/home/globe/:path" element={<GlobalPannel />} />
              </Route>
              <Route path="/home/spaces/" element={<Spaces />}>
                <Route path="/home/spaces/:spaceId" element={<SpacePannel />}>
                  <Route
                    path="/home/spaces/:spaceId/threads/:threadId"
                    element={<Thread />}
                  />
                </Route>
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
