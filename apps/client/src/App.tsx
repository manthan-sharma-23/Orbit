import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthenticationLayout from "./components/layouts/AuthenticationLayout";
import { SignIn } from "./components/authentication/signin";
import { SignUp } from "./components/authentication/signup";
import { Signout } from "./components/authentication/signout";
import Home from "./pages/home";
import ApplicationLayout from "./components/layouts/ApplicationLayout";
import RootLayout from "./components/layouts/RootLayout";
import Spaces from "./pages/spaces/spaces";
import Global from "./pages/global/global";
import GlobalPannel from "./pages/global/pages/globalPannel";
import ForumsPage from "./pages/global/pages/forum/forumsPage";
import ForumPannel from "./pages/global/pages/forum/forumPannel";
import ForumsList from "./pages/global/pages/forum/forumsList";
import FindMatesPage from "./pages/global/pages/find_users/findMatesPage";
import ProfilePage from "./pages/global/pages/profile/profilePage";
import EditProfile from "./pages/global/pages/profile/editProfile";
import ChatPage from "./pages/chat/chatPage";
import ChatMessages from "./pages/chat/chatMessages";
import InvitesPage from "./pages/global/invites/invitesPage";
import InviteRedirect from "./pages/global/invites/pages/inviteRedirect";
import SpaceId from "./pages/spaces/pages/spaceId";
import SpaceInfo from "./pages/spaces/pages/Info";
import TeamPage from "./pages/spaces/pages/teams/teamPage";
import ThreadPage from "./pages/spaces/pages/threads/threadPage";
import TeamsPannel from "./pages/spaces/pages/teams/teamsPannel";
import Townhall from "./pages/spaces/pages/TownHall/Townhall";

function App() {
  return (
    <div className="h-screen w-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route path="/home" element={<ApplicationLayout />}>
              <Route path="/home/chat" element={<ChatPage />}>
                <Route path="/home/chat" element={<ChatPage />} />
                <Route path="/home/chat/:roomId" element={<ChatMessages />} />
              </Route>
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
                <Route path="/home/globe/invites" element={<InvitesPage />}>
                  <Route
                    path="/home/globe/invites/:path"
                    element={<InviteRedirect />}
                  />
                </Route>
                <Route
                  path="/home/globe/profile/edit"
                  element={<EditProfile />}
                />
                <Route path="/home/globe/:path" element={<GlobalPannel />} />
              </Route>
              <Route path="/home/spaces/" element={<Spaces />}>
                <Route path="/home/spaces/:spaceId" element={<SpaceId />}>
                  <Route
                    path="/home/spaces/:spaceId/info"
                    element={<SpaceInfo />}
                  />
                  <Route
                    path="/home/spaces/:spaceId/townhall"
                    element={<Townhall />}
                  />
                  <Route
                    path="/home/spaces/:spaceId/team/:teamId"
                    element={<TeamPage />}
                  >
                    <Route
                      path="/home/spaces/:spaceId/team/:teamId/:path"
                      element={<TeamsPannel />}
                    />
                    <Route
                      path="/home/spaces/:spaceId/team/:teamId/thread/:threadId"
                      element={<ThreadPage />}
                    />
                  </Route>
                  <Route
                    path="/home/spaces/:spaceId/:path"
                    element={<Spaces />}
                  />
                </Route>
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
