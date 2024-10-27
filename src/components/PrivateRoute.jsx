import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuth = localStorage.getItem('isAuth') === 'true';

  return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
