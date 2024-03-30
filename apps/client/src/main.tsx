import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { RecoilRoot } from "recoil";
import { Toaster } from "./components/ui/sonner.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <App />
    <Toaster />
  </RecoilRoot>
);
