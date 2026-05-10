import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import Menu from "./Menu";

createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/tarih-pr/" element={<App />} />
      <Route path="/menu" element={<Menu />} />
    </Routes>
  </Router>
);

