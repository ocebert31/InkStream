import React, { useState, useEffect } from 'react';
import { getOneArticle } from '../API/data';
import { useParams } from 'react-router-dom';
import Delete from './Delete/delete';
import './article.css';

function Article() {
    const [article, setArticle] = useState(null);
    const { id } = useParams();

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

    if (!article) {
        return <div>Loading...</div>;
    }

    return(
        <div>
            <div className='alignement'>
                <h1>{article.title}</h1>
                <Delete id={article._id}></Delete>
            </div>
            {article.imageUrl && <img src={article.imageUrl} alt={article.title} />}
            <p>{article.content}</p>
        </div>
    );
}

export default Article;