import React, { useState, useEffect } from 'react';
import { getArticles } from '../API/articleAPI';
import './articles.css';
import ArticleCard from './ArticleCard/articleCard';

function Article() {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(20);

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const fetchedArticles = await getArticles(page, limit);
                setArticles(fetchedArticles);
            } catch (error) {
               alert(error);
            }
        };
        loadArticles();
    }, [page, limit]);

    return (
        <div>
            <div className="uploaded-articles">
                {articles.length > 0 ? (
                    articles.map((article, index) => (
                        <ArticleCard key={index} article={article}/>
                    ))
                ) : (
                    <p>Aucun article trouvé.</p>
                )}
            </div>
            <div className="pagination-buttons">
                <button onClick={() => setPage(page > 1 ? page - 1 : 1)} disabled={page === 1}>Précédent</button>
                <button onClick={() => setPage(page + 1)} disabled={articles.length === 0}>Suivant</button>
            </div>
        </div>
    );
}

export default Article;