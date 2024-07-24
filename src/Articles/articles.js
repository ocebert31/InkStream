import React, { useState } from 'react';
import  useGetArticles  from '../API/Article/useGetArticles';
import './articles.css';
import ArticleCard from './ArticleCard/articleCard';
import Search from './Search/search';

function Article() {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [limit] = useState(20);

    const { loading, articles, errors } = useGetArticles(searchQuery, page, limit);

    const handleSearchQueryChange = (search) => {
        setSearchQuery(search);
        setPage(1);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (errors) {
        return <div>Error: {errors.message}</div>;
    }

    return (
        <div>
            <Search handleSearchQueryChange={handleSearchQueryChange} />
            <div className='uploaded-articles'>
                {articles.length > 0 ? (
                    articles.map((article, index) => (
                        <ArticleCard key={index} article={article} />
                    ))
                ) : (
                    <p>Aucun article trouvé.</p>
                )}
            </div>
            <div className="pagination-buttons">
                <button onClick={() => setPage(page > 1 ? page - 1 : 1)} disabled={page === 1}>Précédent</button>
                <button onClick={() => setPage(page + 1)} disabled={articles.length < limit}>Suivant</button>
            </div>
        </div>
    );
}

export default Article;
