import React, { useState, useEffect } from 'react';
import { favoriteArticle } from '../API/favoriteAPI'; 
import { useAuth } from '../AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'; 
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

function Favorite({ article }) {
    const { token } = useAuth();
    const [favorite, setFavorite] = useState(article.favorite);

    useEffect(() => {
        setFavorite(article.favorite);
    }, [article.favorite]);

    const handleFavorite = async () => {
        try {
            const result = await favoriteArticle(article._id, token);
            setFavorite(result.favorite);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center gap-4">
            {token && (
                <button onClick={handleFavorite} className={`px-4 py-2 rounded ${favorite ? 'text-secondary' : 'text-primary'}`}>
                    <FontAwesomeIcon className="text-2xl sm:text-3xl md:text-4xl" icon={favorite ? faStarSolid : faStarRegular} />
                </button>
            )}    
        </div>
    );
}

export default Favorite;
