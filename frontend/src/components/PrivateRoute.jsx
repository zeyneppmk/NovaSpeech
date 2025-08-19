import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // yolun tam olduğundan emin ol

export default function PrivateRoute({ children }) {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return null; // veya bir loading spinner bile koyabiliriz
  }

  return isLoggedIn ? children : <Navigate to='/login' replace />;
}
