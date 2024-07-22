import React, { useState, useEffect } from 'react';
import { getOneArticle } from '../API/articleData';
import { useParams } from 'react-router-dom';
import Delete from './Delete/delete';
import Edit from './Edit/edit';
import './article.css';
import ArticleDisplay from '../Article/ArticleDisplay/articleDisplay';
import ArticleEdition from './ArticleEdition/articleEdition';

function Article() {
    const [article, setArticle] = useState(null);
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const loadArticle = async () => {
            try {
                const fetchedArticle = await getOneArticle(id);
                setArticle(fetchedArticle);
            } catch (error) {
                alert(error);
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

    return (
        <div>
            <div className='alignement'>
                <Delete id={article._id}></Delete>
                <Edit editArticle={editArticle}></Edit>
            </div>
            {isEditing ? (
                <ArticleEdition article={article} setArticle={setArticle} cancelEdit={cancelEdit} />
            ) : (
                <ArticleDisplay article={article}/>
            )}
        </div>
    );
}

export default Article;
