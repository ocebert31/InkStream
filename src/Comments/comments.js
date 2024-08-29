import React, { useEffect, useState } from 'react';
import { getComments } from '../API/comment';
import Comment from './Comment/comment';
import New from './Comment/New/new';
import { useAuth } from '../AuthContext';

function Comments({ articleId }) {
    const [comments, setComments] = useState([]);
    const { token, user } = useAuth();

    useEffect(() => {
        const loadComments = async () => {
            try {
                const fetchedComments = await getComments(articleId, token);
                const commentsWithReplies = fetchedComments.map(comment => ({
                    ...comment,
                    replies: comment.replies || []
                }));
                setComments(commentsWithReplies);
            } catch (error) {
                alert(error);
            }
        };
        loadComments();
    }, [articleId, token]);

    const handleCommentAdded = (newComment) => {
        newComment.avatarOptions = user.avatarOptions;
        setComments((prevComments) => {
            if (newComment.commentId) {
                return prevComments.map(comment => {
                    if (comment._id === newComment.commentId) {
                        const replies = comment.replies ? comment.replies : [];
                        return { ...comment, replies: [...replies, newComment] };
                    }
                    return comment;
                });
            } else {
                return [...prevComments, newComment];
            }
        });
    };

    const handleCommentDeleted = (comment) => {
        setComments((prevComments) => {
            if (comment.commentId) {
                return setDeletedDateForReply(prevComments, comment);
            } else {
                return setDeletedDateForComment(prevComments, comment);
            }
        });
    };

    const setDeletedDateForReply = (prevComments, reply) => {
        return prevComments.map(c => {
            if (c._id === reply.commentId) {
                const replies = c.replies ? c.replies.map(r => {
                    if(r._id === reply._id) {
                        return {...r, deletedAt: new Date().toISOString()};
                    }
                    return r;
                }) : []
                return { ...c, replies };
            }
            return c;
        });
    }

    const setDeletedDateForComment = (prevComments, comment) => {
        return prevComments.map(c => {
            if(c._id === comment._id) {
                return {...c, deletedAt: new Date().toISOString()};
            }
            return c;
        })
    }

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-primary mb-4">Commentaires</h3>
            <div className="space-y-4 max-h-96 overflow-auto">
                {comments.map(comment => 
                    <Comment key={comment._id} comment={comment} onDelete={handleCommentDeleted} onReply={handleCommentAdded} />
                )}
            </div>
            <New articleId={articleId} onAdded={handleCommentAdded} />
        </div>
    );
}

export default Comments;
