import React, { useState, useEffect } from 'react';
import { favoriteArticle } from '../services/favoritesService'; 
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'; 
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import ErrorAlert from '../Alert/error';

function Favorites({ article }) {
    const { token } = useAuth();
    const [favorite, setFavorite] = useState(article.favorite);
    const [showErrorAlert, setShowErrorAlert] = useState("");

    useEffect(() => {
        setFavorite(article.favorite);
    }, [article.favorite]);

    const handleFavorite = async () => {
        try {
            const result = await favoriteArticle(article._id, token);
            setFavorite(result.favorite);
        } catch {
            setShowErrorAlert("Erreur lors de l'ajout de l'article dans la liste des favoris");
        }
    };

    return (
        <div className="flex justify-center items-center gap-4">
            {token && (
                <button onClick={handleFavorite} className={`px-2 py-2 rounded ${favorite ? 'text-secondary' : 'text-primary'}`}>
                    <FontAwesomeIcon className="text-2xl sm:text-3xl md:text-4xl" icon={favorite ? faStarSolid : faStarRegular} />
                </button>
            )}    
            {showErrorAlert && (<ErrorAlert message={showErrorAlert} onClose={() => setShowErrorAlert(false)}/>)}
        </div>
    );
}

export default Favorites;
