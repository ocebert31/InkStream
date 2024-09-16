import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext.js';
import { Routes, Route } from 'react-router-dom';
import Articles from './Articles/articles';
import NewArticle from './Articles/New/new';
import Article from './Articles/Article/article';
import Registration from './Registration/registration';
import Login from './Login/login';
import Confirmation from './ConfirmationEmail/confirmationEmail';
import Profile from './Profile/profile';
import RecoveryPassword from './ResetPassword/resetPassword.js';
import ChangePassword from './ResetPassword/formResetPassword.js';
import Dashboard from './Dashboard/dashboard.js';
import { getUserData } from './API/authentification.js';
import ProtectedRoute from './Route/protectedRoute.js';

function RouterComponent() {
    const location = useLocation();
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
        } catch (error) {
           console.error(error)
        }
    };

    return (
        <div>
            <Routes>
                <Route path="/" element={<Articles type='all' />} />
                <Route path="/favorites" element={<Articles type='favorites'/>} />
                <Route path="/articles/:id" element={<Article />} />
                <Route path="/articles/new" element={<NewArticle />}/>
                <Route path="/registration" element={<Registration />} />
                <Route path="/login" element={<Login />} />
                <Route path="/confirmation/:token" element={<Confirmation isEmailUpdate={false}/>}/>
                <Route path="/profile" element={<Profile />} />
                <Route path="/confirmation-update-email/:token" element={<Confirmation isEmailUpdate={true}/>}/>
                <Route path="/request-reset-password" element={<RecoveryPassword/>} />
                <Route path="/form-reset-password/:token" element={<ChangePassword/>}/>
                <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} requiredRole="admin" />} />
            </Routes>
        </div>
    );
}

export default RouterComponent;
