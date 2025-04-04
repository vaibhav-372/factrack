import React from 'react';
import Sidebar from './Sidebar';
import { Routes, Route } from 'react-router-dom';

import Overview from './pages/Overview';
import Managers from './pages/Managers';
import Employees from './pages/Employees';
import Products from './pages/Products';
import Settings from './pages/Settings';
import Reports from './pages/Reports';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <Routes>
          <Route path="" element={<Overview />} />
          <Route path="managers" element={<Managers />} />
          <Route path="employees" element={<Employees />} />
          <Route path="products" element={<Products />} />
          <Route path="reports" element={<Reports />} />        
          <Route path="settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
