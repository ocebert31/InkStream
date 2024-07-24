import React, { useEffect, useState } from 'react';
import { getComments } from '../API/commentAPI';
import Comment from './Comment/comment';
import NewComment from './NewComment/newComment';
import { useAuth } from '../AuthContext';

function Comments({ articleId }) {
    const [comments, setComments] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        const loadComments = async () => {
            try {
                const fetchedComments = await getComments(articleId, token);
                setComments(fetchedComments);
            } catch (error) {
                alert(error);
            }
        };
        loadComments();
    }, [articleId, token]);

    const handleCommentAdded = (newComment) => {
        setComments((prevComments) => [...prevComments, newComment]);
    };
    const handleCommentDeleted = (id) => {
        setComments(comments.filter(comment => comment._id !== id));
    };

    return(
        <div>
            <h3>Commentaires</h3>
            <div>
                {comments.map(comment => 
                    <Comment key={comment._id} comment={comment} onDelete={handleCommentDeleted}/>
                )}
            </div>
            <NewComment articleId={articleId} onAdded={handleCommentAdded} />
        </div>
        
    )
}

export default Comments;