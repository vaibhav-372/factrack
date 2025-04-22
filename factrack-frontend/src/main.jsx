// src/index.js
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './admin/redux/store';

import App from './App';
import AdminLogin from './admin/admin-login/AdminLogin';
import AdminDashboard from './admin/admin-dashboard/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

import './index.css';

// Component to conditionally render based on route
const RootComponent = () => {
  const location = useLocation();

  if (location.pathname === '/root-admin-login') {
    return <AdminLogin />;
  }

  return <App />;
};

// Mount app with createRoot
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <StrictMode>
    <Provider store={store}>
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
          <Route path="/*" element={<RootComponent />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
