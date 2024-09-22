import React, { useState, useEffect } from 'react';
import { getArticles } from '../API/article';
import Card from './Card/card';
import Search from './Search/search';
import './articles.css';
import { useAuth } from '../AuthContext';
import Filter from './Filter/filter';
import InfiniteScrollComponent from '../Components/infiniteScroll';

function Articles({ type }) {
    const { token } = useAuth();
    const [articles, setArticles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const [page, setPage] = useState(1);
    const [limit] = useState(20);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        loadArticles();
    }, [page, searchQuery, selectedCategory]);

    const loadArticles = async () => {
        try {
            const fetchedArticles = await getArticles(searchQuery, page, limit, type, token, selectedCategory);
            setArticles(prevArticles => page === 1 ? fetchedArticles : [...prevArticles, ...fetchedArticles]);
            if (fetchedArticles.length < limit) {
                setHasMore(false);
            }
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        setArticles([]);
        setPage(1);
        setHasMore(true);
    }, [searchQuery, selectedCategory]);

    const handleSearchQueryChange = (search) => {
        setSearchQuery(search);
        setPage(1);
    }

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
        setPage(1);
    }

    return (
        <div className="container mx-auto px-4">
            <div className="text-center my-16">
                <h1 className="font-inkstream font-bold text-primary mb-4 relative">
                    <span className="block">Inkstream</span>
                    <span className="block h-1 bg-primary mx-auto mt-2"></span>
                </h1>
            </div>
            <div className='flex justify-center items-center'>
                <Search handleSearchQueryChange={handleSearchQueryChange} />
                <Filter onCategoryChange={handleCategoryChange} />
            </div>
            <InfiniteScrollComponent loadMore={() => setPage(page + 1)} dataLength={articles.length} hasMore={hasMore}>
                <ul>
                    {articles.map((article, index) => (
                        <Card key={index} article={article} />
                    ))}
                </ul>
            </InfiniteScrollComponent>
        </div>
    );
}

export default Articles;
