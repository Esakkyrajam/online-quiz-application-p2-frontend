import { Navigate } from "react-router-dom";
import { useQuizAuth } from "./QuizAuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user } = useQuizAuth();
  console.log("ProtectedRoute user roles:", user?.roles);

  if (!user?.token) {
    // not authenticated
    return <Navigate to="/login" replace />;
  }

  if (role && !user.roles.includes(role)) {
    // unauthorized role
    return <Navigate to="/unauthorized" replace />; // or "/"
  }

  return children;
}
