import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import StickyCursor from "./components/StickyCursor";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import { CursorProvider } from "./helpers/CursorContext";

function App() {
  return (
    <CursorProvider>
      <Router>
        <StickyCursor />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ProjectsPage />} />
        </Routes>
      </Router>
    </CursorProvider>
  );
}

export default App;
