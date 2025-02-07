import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Menu from "./Menu.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/tarih-pr" element={<App />} />
      <Route path="tarih-pr/menu/" element={<Menu />} />
    </Routes>
  </BrowserRouter>,
);
