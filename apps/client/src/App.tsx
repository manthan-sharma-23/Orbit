import { BrowserRouter, Routes } from "react-router-dom";
import { CardWithForm } from "./card";

function App() {
  return (
    <div>
      <CardWithForm />
      <BrowserRouter>
        <Routes></Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
