import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Articles from './Articles/articles';
import NewArticle from './NewArticle/newArticle';

function routeur() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Articles />} />
                <Route path="/articles/new" element={<NewArticle />} />
            </Routes>
        </div>
    )
}

export default routeur;