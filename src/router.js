import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Articles from './Articles/articles';
import NewArticle from './Articles/New/new';
import Article from './Articles/Article/article';
import Registration from './Registration/registration';
import Login from './Login/login';
import ConfirmationRegistration from './Confirmation/confirmationRegistration';
import Profile from './Profile/profile';
import ConfirmationUpdateEmail from './Confirmation/confirmationUpdateEmail';

function RouterComponent() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Articles type='all' />} />
                <Route path="/favorites" element={<Articles type='favorites'/>} />
                <Route path="/articles/:id" element={<Article />} />
                <Route path="/articles/new" element={<NewArticle />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/login" element={<Login />} />
                <Route path="/confirmation/:token" element={<ConfirmationRegistration />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/confirmation-update-email/:token" element={<ConfirmationUpdateEmail />} />
            </Routes>
        </div>
    );
}

export default RouterComponent;
