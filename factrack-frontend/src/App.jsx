import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AdminLogin from './admin/admin-login/AdminLogin';

const App = () => {
  const location = useLocation();

  return (
    <div>
      <h1>Factrack app</h1>
    </div>
  );
};

export default App;
