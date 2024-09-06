import React from 'react';
import { Routes, Route } from 'react-router-dom';  // No BrowserRouter here
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Homes from './pages/Homes';
import Clients from './pages/Clients';
import Sales from './pages/Sales';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/homes" element={<PrivateRoute><Homes /></PrivateRoute>} />
      <Route path="/clients" element={<PrivateRoute><Clients /></PrivateRoute>} />
      <Route path="/sales" element={<PrivateRoute><Sales /></PrivateRoute>} />
    </Routes>
  );
};

export default App;
