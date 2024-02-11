import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Render from "./components/container/Render";
import AppLayout from "./components/layouts/AppLayout";

function App() {
  return (
    <RecoilRoot>
      <Render>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}></Route>
          </Routes>
        </BrowserRouter>
      </Render>
    </RecoilRoot>
  );
}

export default App;
