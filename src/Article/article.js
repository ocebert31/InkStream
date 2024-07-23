import React, { useState, useEffect } from 'react';
import { getOneArticle } from '../API/articleAPI';
import { useParams } from 'react-router-dom';
import Delete from './Delete/delete';
import Edit from './Edit/edit';
import './article.css';
import ArticleDisplay from '../Article/ArticleDisplay/articleDisplay';
import ArticleEdition from './ArticleEdition/articleEdition';
import { useAuth } from "../AuthContext";
import Comments from '../Comments/comments';

function Article() {
    const [article, setArticle] = useState(null);
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const loadArticle = async () => {
            try {
                const fetchedArticle = await getOneArticle(id);
                setArticle(fetchedArticle);
            } catch (error) {
                alert(error.message);
            }
        };
        loadArticle();
    }, [id]);

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
        <div>
            <div className='alignement'>
                {isAuthor && (
                    <>
                        <Delete id={article._id} />
                        <Edit editArticle={editArticle} />
                    </>
                )}
            </div>
            {isEditing ? (
                <ArticleEdition article={article} setArticle={setArticle} cancelEdit={cancelEdit} />
            ) : (
                <>
                <ArticleDisplay article={article} />
                <Comments articleId={article._id}/>
                </>
            )}
        </div>
    );
}

export default Article;
