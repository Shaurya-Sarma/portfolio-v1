import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import StickyCursor from "./components/StickyCursor";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import { CursorProvider } from "./helpers/CursorContext";
import ProjectBreakdownPage from "./pages/ProjectBreakdownPage";
import ErrorPage from "./components/ErrorPage";
import CreativePage from "./pages/CreativePage";

function App() {
  return (
    <CursorProvider>
      <Router>
        <StickyCursor />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/creative" element={<CreativePage />} />
          <Route path="/projects/:slug" element={<ProjectBreakdownPage />} />
          <Route path="*" element={<ErrorPage message="Page not found." />} />
        </Routes>
      </Router>
    </CursorProvider>
  );
}

export default App;
