import { Navigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext'; // AuthContext'ten user alıyoruz

export default function AdminRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // veya loading spinner gösterebilirsin
  }

  if (!user || !user.is_staff) {
    return <Navigate to='/test' replace />;
  }

  return children;
}
