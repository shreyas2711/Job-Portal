// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import CreateJobPost from './pages/CreateJobPost'

const ProtectedRoute = ({ isAuth, CreateJobPost }) => {
  return isAuth ? <Route element={<CreateJobPost/>} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;