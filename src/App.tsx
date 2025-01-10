import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import StickyCursor from "./components/StickyCursor";
import HomePage from "./pages/HomePage";
import NavigationBar from "./components/NavigationBar";
import ProjectsPage from "./pages/ProjectsPage";
import { useRef } from "react";

function App() {
  const stickyElements = useRef<HTMLDivElement>(null);

  return (
    <Router>
      <NavigationBar ref={stickyElements} />
      <StickyCursor stickyElement={stickyElements} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ProjectsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
