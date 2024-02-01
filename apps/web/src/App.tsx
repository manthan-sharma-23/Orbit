import { BrowserRouter, Routes, Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signinup from "./pages/Sign-in-up";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={"/login"} element={<Signinup />} />
          <Route path={"/register"} element={<Signinup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
