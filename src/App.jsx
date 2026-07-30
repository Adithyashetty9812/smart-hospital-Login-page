import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PlaceholderDashboard from "./pages/PlaceholderDashboard";

function App() {
  return (
    <Routes>
      {/* Default route sends visitors straight to the login page */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPage />} />

      {/* One route per role, each currently using the same
          placeholder until the real dashboards are built */}
      <Route
        path="/patient/dashboard"
        element={<PlaceholderDashboard roleLabel="Patient" />}
      />
      <Route
        path="/doctor/dashboard"
        element={<PlaceholderDashboard roleLabel="Doctor" />}
      />
      <Route
        path="/admin/dashboard"
        element={<PlaceholderDashboard roleLabel="Admin" />}
      />
    </Routes>
  );
}

export default App;
