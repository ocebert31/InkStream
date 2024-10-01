import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AuthenticatedRoute  ({ element: Element, hasToken, ...rest }) {
    const { token } = useAuth();
    const location = useLocation();

    if (token && !hasToken) {
        return <Navigate to="/" state={{ from: location }} />;
    }
    return <Element {...rest} />;
};

export default AuthenticatedRoute ;
