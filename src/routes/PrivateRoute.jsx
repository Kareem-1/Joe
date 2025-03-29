// src/routes/PrivateRoute.js
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  // If no token found, redirect to /login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Else, render the children
  return children;
}

export default PrivateRoute;
