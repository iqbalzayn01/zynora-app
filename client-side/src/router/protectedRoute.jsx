import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute() {
  const { idToken } = useSelector((state) => state.auth);

  if (!idToken) return <Navigate to="/login" replace />;

  return <Outlet />;
}
