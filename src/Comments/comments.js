import React, { useEffect, useState } from 'react';
import { getComments } from '../API/commentAPI';
import NewComment from './newComment';
import './comments.css';

function Comments({ articleId }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const loadComments = async () => {
            try {
                const fetchedComments = await getComments(articleId);
                setComments(fetchedComments);
            } catch (error) {
                alert(error);
            }
        };
        loadComments();
    }, [articleId]);

    const handleCommentAdded = (newComment) => {
        setComments((prevComments) => [...prevComments, newComment]);
    };

    return (
        <div>
            <h3>Commentaires</h3>
            <ul>
                {comments.map(comment => {
                    const date = new Date(comment.createdAt);
                    const formattedDate = date.toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    });
                    return (
                        <li key={comment._id}>
                            <div className='comment-style'>
                                <p><strong>{comment.pseudo}</strong></p>
                                <p><em>{formattedDate}</em></p>
                            </div>
                            <p>{comment.content}</p>
                        </li>
                    );
                })}
            </ul>
            <NewComment articleId={articleId} onCommentAdded={handleCommentAdded} />
        </div>
    );
}

export default Comments;
