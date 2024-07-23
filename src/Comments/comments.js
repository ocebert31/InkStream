import React, { useEffect, useState } from 'react';
import { getComments } from '../API/commentAPI';
import NewComment from './newComment';

function Comments({articleId}) {
    const [comments, setComments] = useState([]);;

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
    }

    return (
        <div>
            <h3>Commentaires</h3>
            <ul>
                {comments.map(comment => (
                    <li key={comment._id}>
                        <p>{comment.content}</p>
                    </li>
                ))}
            </ul>
            <NewComment articleId={articleId} onCommentAdded={handleCommentAdded}/>
        </div>
    );
}

export default Comments;
