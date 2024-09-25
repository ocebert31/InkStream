import React, { useState, useEffect } from 'react';
import { getOneArticle } from '../../API/article';
import { useParams } from 'react-router-dom';
import Delete from './Button/delete';
import Edit from './Button/edit';
import './article.css';
import ArticleDisplay from '../Article/Display/display';
import ArticleEdition from './Edition/edition';
import { useAuth } from "../../AuthContext";
import Comments from '../../Comments/comments';
import ErrorAlert from '../../Alert/error';

function Article() {
    const [article, setArticle] = useState(null);
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const { user, token } = useAuth();
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    
    useEffect(() => {
        const loadArticle = async () => {
            try {
                const fetchedArticle = await getOneArticle(id, token);
                setArticle(fetchedArticle);
            } catch {
                setShowErrorAlert(true);
            }
        };
        loadArticle();
    }, [id, token]);

    const editArticle = () => {
        setIsEditing(true);
    };

    const cancelEdit = () => {
        setIsEditing(false);
    };

    if (!article) {
        return <div>Loading...</div>;
    }

    const isAuthor = user && (user._id === article.userId || user.role === 'admin');
 
    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className="container mx-auto px-4 py-8">
                {isAuthor && (
                    <div className="flex justify-center space-x-4 mb-4">
                        <Delete id={article._id} />
                        <Edit editArticle={editArticle} isEditing={isEditing}/>
                    </div>
                )}
                {isEditing ? (
                    <ArticleEdition article={article} setArticle={setArticle} cancelEdit={cancelEdit} />
                ) : (
                    <div>
                        <ArticleDisplay article={article}/>
                        <Comments articleId={article._id}/>
                    </div>
                )}
            </div>
        {showErrorAlert && (<ErrorAlert message="Erreur lors de la récupération de l article." onClose={() => setShowErrorAlert(false)}/>)}
        </div>
    );
}

export default Article;
