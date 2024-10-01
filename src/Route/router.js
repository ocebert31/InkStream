import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext.js';
import { Routes, Route } from 'react-router-dom';
import Articles from '../Articles/articles.js';
import NewArticle from '../Articles/New/new.js';
import Article from '../Articles/Article/article.js';
import Registration from '../Registration/registration.js';
import Login from '../Login/login.js';
import Confirmation from '../ConfirmationEmail/confirmationEmail.js';
import Profile from '../Profile/profile.js';
import RecoveryPassword from '../ResetPassword/resetPassword.js';
import ChangePassword from '../ResetPassword/formResetPassword.js';
import Dashboard from '../Dashboard/dashboard.js';
import { getUserData } from '../services/authenticationService.js';
import RoleRoute from './roleRoute.js';
import AuthenticatedRoute  from './authenticatedRoute.js';
import ErrorAlert from '../Alert/error.js';

function RouterComponent() {
    const location = useLocation();
    const [showErrorAlert, setShowErrorAlert] = useState('');
    const { user, updateUser, token } = useAuth();

    useEffect(() => {
      if (user) {
        fetchUserData();
      }
    }, [location]);

    const fetchUserData = async () => {
        try {
            const userData = await getUserData(token);
            updateUser(userData)
        } catch {
            setShowErrorAlert('Erreur lors de la récupération de vos données utilisateur')
        }
    };

    return (
        <div>
            <Routes>
                <Route path="/" element={<Articles type='all' />} />
                <Route path="/favorites" element={<Articles type='favorites'/>} />
                <Route path="/articles/:id" element={<Article />} />
                <Route path="/articles/new" element={<RoleRoute element={NewArticle} requiredRoles={['author', 'admin']} />} />
                <Route path="/registration" element={<AuthenticatedRoute  element={Registration} hasToken={false}/>} />
                <Route path="/login" element={<AuthenticatedRoute  element={Login} hasToken={false}/>} />
                <Route path="/confirmation/:token" element={<Confirmation isEmailUpdate={false}/>}/>
                <Route path="/profile" element={<AuthenticatedRoute  element={Profile} hasToken={true}/>} />
                <Route path="/confirmation-update-email/:token" element={<Confirmation isEmailUpdate={true}/>}/>
                <Route path="/request-reset-password" element={<AuthenticatedRoute  element={RecoveryPassword} hasToken={false}/>} />
                <Route path="/form-reset-password/:token" element={<ChangePassword/>}/>
                <Route path="/dashboard" element={<RoleRoute element={Dashboard} requiredRoles={['admin']} />} />
            </Routes>
            {showErrorAlert && (<ErrorAlert message={showErrorAlert} onClose={() => setShowErrorAlert(false)}/>)}
        </div>
    );
}

export default RouterComponent;
