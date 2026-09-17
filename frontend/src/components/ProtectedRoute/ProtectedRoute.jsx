import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Sin "roles", solo exige que haya sesión iniciada (cualquier usuario).
export default function ProtectedRoute({ roles, children }) {
  const { user } = useAuth();

  if (!user) {
    // No hay sesión -> manda a login
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    // Hay sesión, pero no tiene el rol necesario -> manda al home
    return <Navigate to="/" replace />;
  }

  return children;
}