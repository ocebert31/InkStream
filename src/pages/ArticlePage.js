import React, { useState, useEffect } from 'react';
import { getOneArticle } from '../services/articleService';
import { useParams } from 'react-router-dom';
import Delete from '../components/Article/ArticleHandler/DeleteArticleButton';
import Edit from '../components/Article/ArticleHandler/EditArticleButton';
import ArticleDisplay from '../components/Article/DisplayArticle/ArticleContent';
import ArticleEdition from '../components/Article/ArticleHandler/EditArticleForm';
import { useAuth } from "../context/AuthContext";
import Comments from '../components/Comment/CommentList';
import ErrorAlert from '../components/Notifications/ErrorAlert';
import { isAuthor } from '../utils/helpers/autorization';

function ArticlePage() {
    const [article, setArticle] = useState(null);
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const { user, token } = useAuth();
    const [showErrorAlert, setShowErrorAlert] = useState("");
    
    useEffect(() => {
        const loadArticle = async () => {
            try {
                const result = await getOneArticle(id, token);
                setArticle(result);
            } catch {
                setShowErrorAlert("Erreur lors de la récupération de l article.");
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
        return  <div className="flex justify-center items-center min-h-screen bg-gray-100">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-primary border-solid"></div>
                        <p className="mt-4 text-xl text-gray-700 font-semibold">Chargement...</p>
                    </div>
                </div>
    }
 
    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className="container mx-auto px-4 py-8">
                {isAuthor(user, article) && (
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
        {showErrorAlert && (<ErrorAlert message={showErrorAlert} onClose={() => setShowErrorAlert(false)}/>)}
        </div>
    );
}

export default ArticlePage;
