// src/components/RoutesComponent.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./Layout";
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import AdminDashboard from "../pages/AdminDashboard";
import ParticipantDashboard from "../pages/ParticipantDashboard";
import QuizPage from "../pages/QuizPage";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import { QuizAuthProvider } from "./QuizAuthContext";
import ManageUsers from "../pages/ManageUsers";
import ManageQuizzes from "../pages/ManageQuizzes";
import Reports from "../pages/Reports";
import QuizCreatePage from "../pages/QuizCreatePage";
import QuizEditPage from "../pages/QuizEditPage";
import EditUserPage from "../pages/EditUserPage";
import AdminReports from "../pages/AdminReports";
import ResetPassword from "../pages/ResetPssword";
import QuizResultPage from "../pages/QuizResultPage";

const RoutesComponent = () => {
  return (
    <QuizAuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public Routes */}
            <Route index element={<HomePage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/unauthorized" element={<div>Unauthorized</div>} />

            {/* Admin Protected Routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute role="ROLE_ADMIN">
                  <Routes>
                    <Route index element={<AdminDashboard />} />
                    <Route path="users" element={<ManageUsers />} />
                    <Route path="quizzes" element={<ManageQuizzes />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="quiz-create" element={<QuizCreatePage />} />
                    <Route path="quiz-edit/:id" element={<QuizEditPage />} />
                    <Route
                      path="user-edit/:userId"
                      element={<EditUserPage />}
                    />
                    <Route path="admin-reports" element={<AdminReports />} />
                  </Routes>
                </ProtectedRoute>
              }
            />

            {/* Participant Protected Routes */}
            <Route
              path="/participant/*"
              element={
                <ProtectedRoute allowedRoles="ROLE_PARTICIPANT">
                  <ParticipantDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz/:id"
              element={
                <ProtectedRoute allowedRoles="ROLE_PARTICIPANT">
                  <QuizPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <QuizResultPage />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </QuizAuthProvider>
  );
};

export default RoutesComponent;
