import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "bootstrap-icons/font/bootstrap-icons.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { ProjectPage } from "./components/ProjectPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:projectName" element={<ProjectPage />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
