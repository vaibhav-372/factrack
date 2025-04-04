import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import App from './App';
import AdminLogin from './admin/admin-login/AdminLogin';
import './index.css';

const RootComponent = () => {
  const location = useLocation();

  // If the route is "/admin-login", render only the AdminLogin component
  if (location.pathname === '/root-admin-login') {
    return <AdminLogin />;
  }

  // Otherwise, load the full app
  return <App />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<RootComponent />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
