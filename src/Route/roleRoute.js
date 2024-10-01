import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RoleRoute({ element: Element, requiredRoles, ...rest }) {
    const { user } = useAuth();
    const location = useLocation();

    if (!user || !requiredRoles.includes(user.role)) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    return <Element {...rest} />;
};

export default RoleRoute;
