import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { Routes, Route } from 'react-router-dom';
import Articles from '../pages/HomePage.js';
import NewArticle from '../pages/NewArticlePage.js';
import Article from '../pages/ArticlePage.js';
import Registration from '../pages/RegisterPage.js';
import Login from '../pages/LoginPage.js';
import Confirmation from '../pages/ConfirmationEmailPage.js';
import Profile from '../pages/ProfilePage.js';
import RecoveryPassword from '../pages/ResetPasswordPage.js';
import ChangePassword from '../pages/ResetPasswordForm.js';
import Dashboard from '../pages/DashboardPage.js';
import { getUserData } from '../services/authenticationService.js';
import RoleRoute from './RoleRoute.js';
import AuthenticatedRoute  from './AuthenticatedRoute.js';
import ErrorAlert from '../components/Notifications/ErrorAlert.js';

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
