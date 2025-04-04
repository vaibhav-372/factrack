import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import App from './App';
import AdminLogin from './admin/admin-login/AdminLogin';
import './index.css';
import AdminDashboard from './admin/admin-dashboard/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

const RootComponent = () => {
  const location = useLocation();

  // Show AdminLogin only when this path is typed
  if (location.pathname === '/root-admin-login') {
    return <AdminLogin />;
  }

  // Everything else routes to <App />
  return <App />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/root-admin-login" element={<AdminLogin />} />
        
        <Route
          path="/admin/dashboard/*"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Everything else */}
        <Route path="/*" element={<RootComponent />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
