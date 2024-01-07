import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ isAuth, component: Component, ...rest }) => {
  return isAuth ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default AuthRoute;
