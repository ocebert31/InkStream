import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Articles from './Articles/articles';
import NewArticle from './NewArticle/newArticle';
import Article from './Article/article';
import Registration from './Registration/registration';

function routeur() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Articles />} />
                <Route path="/articles/:id" element={<Article />} />
                <Route path="/articles/new" element={<NewArticle />} />
                <Route path="/registration" element={<Registration />} />
            </Routes>
        </div>
    )
}

export default routeur;