import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LandingPage from "./pages/LandingPage";
import AddDoctorPage from "./pages/AddDoctorPage";
import PatientDashboard from "./pages/PatientDashboard";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import ProfilePage from "./pages/ProfilePage";
import AIHealthcareAssistant from "./pages/AIHealthcareAssistant";

import DoctorDashboard from "./pages/DoctorDashboard";

import AdminDashboard from "./pages/AdminDashboard";
import AppointmentManagement from "./pages/AppointmentManagement";
import ReportsPage from "./pages/ReportsPage";
import EditDoctorPage from "./pages/EditDoctorPage";

import ChangePasswordPage from "./pages/ChangePasswordPage";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* Landing */}
      <Route
        path="/"
        element={<LandingPage />}
      />

      {/* Authentication */}
      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPasswordPage />}
      />

      {/* ====================== PATIENT ====================== */}

      <Route
        path="/patient/dashboard"
        element={
          <ProtectedRoute allowedRole="Patient">
            <PatientDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/patient/book"
        element={
          <ProtectedRoute allowedRole="Patient">
            <BookAppointmentPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/patient/profile"
        element={
          <ProtectedRoute allowedRole="Patient">
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/patient/ai"
        element={
          <ProtectedRoute allowedRole="Patient">
            <AIHealthcareAssistant />
          </ProtectedRoute>
        }
      />

      {/* ====================== DOCTOR ====================== */}

      <Route
        path="/doctor/dashboard"
        element={
          <ProtectedRoute allowedRole="Doctor">
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />

      {/* ====================== ADMIN ====================== */}

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRole="Admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/doctors/add"
        element={
          <ProtectedRoute allowedRole="Admin">
            <AddDoctorPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/doctors/edit/:id"
        element={
          <ProtectedRoute allowedRole="Admin">
            <EditDoctorPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/appointments"
        element={
          <ProtectedRoute allowedRole="Admin">
            <AppointmentManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/reports"
        element={
          <ProtectedRoute allowedRole="Admin">
            <ReportsPage />
          </ProtectedRoute>
        }
      />

      {/* ====================== COMMON ====================== */}

      <Route
        path="/change-password"
        element={
          <ProtectedRoute>
            <ChangePasswordPage />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default App;