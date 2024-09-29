import React from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isSignedIn } = useAuth();

  return isSignedIn ? children : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
