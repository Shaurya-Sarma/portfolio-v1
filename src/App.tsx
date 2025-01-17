import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import StickyCursor from "./components/StickyCursor";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import { CursorProvider } from "./helpers/CursorContext";
import ProjectBreakdownPage from "./pages/ProjectBreakdownPage";
import ErrorPage from "./components/ErrorPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <CursorProvider>
      <Router>
        <StickyCursor />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/projects/:slug" element={<ProjectBreakdownPage />} />
          <Route path="*" element={<ErrorPage message="Page not found." />} />
        </Routes>
      </Router>
    </CursorProvider>
  );
}

export default App;
