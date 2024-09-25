import React, { useEffect, useState } from 'react';
import { getComments } from '../API/comment';
import Comment from './Comment/comment';
import New from './Comment/New/new';
import { useAuth } from '../AuthContext';
import defaultAvatarOptions from '../Avatar/defaultAvatarOptions';
import InfiniteScrollComponent from '../Components/infiniteScroll';

function Comments({ articleId }) {
    const [comments, setComments] = useState([]);
    const { token, user } = useAuth();
    const [avatarOptions, setAvatarOptions] = useState(null);
    const [page, setPage] = useState(1);
    const [limit] = useState(20);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        loadComments();
    }, [page]);

    const valueOfAvatarOptions = (user) => {
        if (!user || user.avatarOptions === undefined || (Object.keys(user.avatarOptions).length === 0)) {
            return defaultAvatarOptions;
        } else {
            return user.avatarOptions;
        }
    };

    useEffect(() => {
        if (user) {
            setAvatarOptions(valueOfAvatarOptions(user));
        }
    }, [user]);

    const loadComments = async () => {
        try {
            const fetchedComments = await getComments(articleId, token, page, limit);
            const commentsWithReplies = fetchedComments.map(comment => ({
                ...comment,
                replies: comment.replies || []
            }));
            setComments(prevComments => page === 1 ? commentsWithReplies : [...prevComments, ...commentsWithReplies]);

            if (fetchedComments.length < limit) {
                setHasMore(false);
            }
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        setComments([]);
        setPage(1);
        setHasMore(true);
    }, [articleId]);

    const handleCommentAdded = (newComment) => {
        newComment.avatarOptions = avatarOptions;
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
                    if (r._id === reply._id) {
                        return { ...r, deletedAt: new Date().toISOString() };
                    }
                    return r;
                }) : [];
                return { ...c, replies };
            }
            return c;
        });
    };

    const setDeletedDateForComment = (prevComments, comment) => {
        return prevComments.map(c => {
            if (c._id === comment._id) {
                return { ...c, deletedAt: new Date().toISOString() };
            }
            return c;
        });
    };

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-primary mb-4">Commentaires</h3>
            <New articleId={articleId} onAdded={handleCommentAdded} />
            <InfiniteScrollComponent loadMore={() => setPage(page + 1)} dataLength={comments.length} hasMore={hasMore}>
                <ul>
                    {comments.map(comment => (
                        <Comment key={comment._id} comment={comment} handleCommentDeleted={handleCommentDeleted} onReply={handleCommentAdded} />
                    ))}
                </ul>
            </InfiniteScrollComponent>
        </div>
    );
}

export default Comments;
