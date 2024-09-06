import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';  // Import AuthContext

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);  // Destructure `auth` from the context

  // If not authenticated, redirect to login
  if (!auth) {
    return <Navigate to="/" />;
  }

  // If authenticated, render the children (protected component)
  return children;
};

export default PrivateRoute;