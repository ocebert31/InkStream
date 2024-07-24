import React, { useEffect, useState } from 'react';
import { getComments } from '../API/commentAPI';
import NewComment from './newComment';
import './commentSection.css';
import Comments from './comments';

function CommentSection({ articleId }) {
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
    const handleDelete = (id) => {
        setComments(comments.filter(comment => comment._id !== id));
    };

    return (
        <div>
            <h3>Commentaires</h3>
            <Comments comments={comments} setComments={setComments} onDelete={handleDelete}/>
            <NewComment articleId={articleId} onCommentAdded={handleCommentAdded} />
        </div>
    );
}

export default CommentSection;
