import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation();

  return (
    <div>
      <h1>Factrack app</h1>
    </div>
  );
};

export default App;
