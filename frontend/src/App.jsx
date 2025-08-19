import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './components/AuthContext';
import Home from './pages/Home';
import Services from './pages/Services';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Test from './pages/Test';
import PrivateRoute from './components/PrivateRoute';
import ChangePassword from './pages/ChangePassword';
import Footer from './components/Footer';
import Blog from './pages/Blog';
import AdminRoutes from './admin/routes/AdminRoutes';
import { Toaster } from 'react-hot-toast';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/services' element={<Services />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route
          path='/profile'
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path='/test'
          element={
            <PrivateRoute>
              <Test />
            </PrivateRoute>
          }
        />
        <Route
          path='/change-password'
          element={
            <PrivateRoute>
              <ChangePassword />
            </PrivateRoute>
          }
        />

        <Route path='/admin/*' element={<AdminRoutes />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className='min-h-screen bg-white dark:bg-[#0f172a] text-black dark:text-white'>
          <AppContent />
          <Toaster position='top-right' reverseOrder={false} />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
