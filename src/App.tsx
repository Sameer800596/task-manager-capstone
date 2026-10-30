import { Routes, Route, Navigate } from "react-router-dom";

import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailsPage from "./pages/ProjectsDetailsPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Login page */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected pages */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<ProjectsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route
          path="/projects/:projectId"
          element={<ProjectDetailsPage />}
        />
      </Route>

      {/* Unknown URL */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;