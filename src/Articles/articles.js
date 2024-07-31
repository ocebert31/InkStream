import React, { useState, useEffect } from 'react';
import {getArticles} from '../API/articleAPI';
import ArticleCard from './ArticleCard/articleCard';
import Search from './Search/search';
import './articles.css';
import { useAuth } from '../AuthContext';

function Articles({ type }) {
    const { token } = useAuth();
    const [articles, setArticles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [limit] = useState(20);

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const fetchedArticles = await getArticles(searchQuery, page, limit, type, token);
                setArticles(fetchedArticles);
            } catch (error) {
               alert(error);
            }
        };
        loadArticles();
    }, [searchQuery, page, limit, type, token]);

    const handleSearchQueryChange = (search) => {
        setSearchQuery(search);
        setPage(1);
    };

    return (
        <div className="container mx-auto px-4">
            <div className="text-center my-16">
                <h1 className="font-inkstream font-bold text-primary mb-4 relative">
                    <span className="block">Inkstream</span>
                    <span className="block h-1 bg-primary mx-auto mt-2"></span>
                </h1>
            </div>
            <Search handleSearchQueryChange={handleSearchQueryChange} />
            <div className="space-y-6 mt-8">
                {articles.length > 0 ? (
                    articles.map((article, index) => (
                        <ArticleCard key={index} article={article} />
                    ))
                ) : (
                    <p className="text-center mt-10">Aucun article trouvé.</p>
                )}
            </div>
            <div className="flex justify-between mt-8">
                <button onClick={() => setPage(page > 1 ? page - 1 : 1)} disabled={page === 1} className="px-4 py-2 bg-primary text-white rounded-md disabled:bg-gray-300">Précédent</button>
                <button onClick={() => setPage(page + 1)} disabled={articles.length < limit} className="px-4 py-2 bg-primary text-white rounded-md disabled:bg-gray-300">Suivant</button>
            </div>
        </div>
    );
}

export default Articles;
