import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext.js';

const DashboardRoute = ({ element: Element, requiredRole, ...rest }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user || user.role !== requiredRole) {
        return <Navigate to="/" state={{ from: location }} />;
    }
    return <Element {...rest} />;
};

export default DashboardRoute;
