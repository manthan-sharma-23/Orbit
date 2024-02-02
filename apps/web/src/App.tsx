import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signinup from "./pages/Sign-in-up";
import { Provider } from "react-redux";
import { store } from "./lib/store/store";

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path={"/login"} element={<Signinup />} />
            <Route path={"/register"} element={<Signinup />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
