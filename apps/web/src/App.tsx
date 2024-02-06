import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signinup from "./pages/Sign-in-up";
import { Provider } from "react-redux";
import { store } from "./features/store/store";
import BaseLayout from "./components/layouts/BaseLayout";
import ChatLayout from "./components/layouts/ChatLayout";
import Chat from "./pages/Chat";

function App() {
  return (
    <main>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<BaseLayout />}>
              <Route index element={<Home />} />
              <Route path="/chat" element={<ChatLayout />}>
                <Route path="/chat/:id" element={<Chat />} />
              </Route>
            </Route>
            <Route path={"/login"} element={<Signinup />} />
            <Route path={"/register"} element={<Signinup />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </main>
  );
}

export default App;
