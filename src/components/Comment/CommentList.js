import React, { useEffect, useState } from 'react';
import { getComments } from '../../services/commentService';
import DisplayComment from './DisplayComment/DisplayComment';
import NewCommentForm from './CommentForm/NewCommentForm';
import { useAuth } from '../../context/AuthContext';
import defaultAvatarData from '../../utils/constants/defaultAvatarOptions';
import InfiniteScrollComponent from '../../common/UI/InfiniteScroll';
import ErrorAlert from '../Notifications/ErrorAlert';
import { checkHasMore } from '../../utils/helpers/checkHasMore';

function CommentList({ articleId }) {
    const [comments, setComments] = useState([]);
    const { token, user } = useAuth();
    const [avatarOptions, setAvatarOptions] = useState(null);
    const [page, setPage] = useState(1);
    const [limit] = useState(20);
    const [hasMore, setHasMore] = useState(true);
    const [showErrorAlert, setShowErrorAlert] = useState("");

    useEffect(() => {
        const loadComments = async () => {
            try {
                const result = await getComments(articleId, token, page, limit);
                const commentsWithReplies = result.map(comment => ({
                    ...comment,
                    replies: comment.replies || []
                }));
                setComments(prevComments => page === 1 ? commentsWithReplies : [...prevComments, ...commentsWithReplies]);
                checkHasMore(result, limit, setHasMore);
            } catch {
                setShowErrorAlert("Erreur lors de la récupération des commentaires.");
            }
        };
        loadComments();
    }, [page]);

    useEffect(() => {
        if (user) {
            setAvatarOptions(valueOfAvatarOptions(user));
        }
    }, [user]);

    useEffect(() => {
        setComments([]);
        setPage(1);
        setHasMore(true);
    }, [articleId]);

    const valueOfAvatarOptions = (user) => {
        if (!user || user.avatarOptions === undefined || (Object.keys(user.avatarOptions).length === 0)) {
            return defaultAvatarData;
        } else {
            return user.avatarOptions;
        }
    };

    const handleCommentAdded = (newComment) => {
        newComment.avatarOptions = avatarOptions;
        setComments((prevComments) => {
            if (newComment.commentId) {
                return prevComments.map(comment => {
                    return attachReplyToParentComment(comment, newComment)
                });
            } else {
                return [...prevComments, newComment];
            }
        });
    };

    const attachReplyToParentComment = (comment, newComment) => {
        if (comment._id === newComment.commentId) {
            const replies = comment.replies ? comment.replies : [];
            return { ...comment, replies: [...replies, newComment] };
        }
        return comment;
    }

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
                    return updateReplyById(r, reply)
                }) : [];
                return { ...c, replies };
            }
            return c;
        });
    };

    const updateReplyById = (r, reply) => {
        if (r._id === reply._id) {
            return { ...r, deletedAt: new Date().toISOString() };
        }
        return r;
    }

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
            <NewCommentForm articleId={articleId} onAdded={handleCommentAdded} />
            <InfiniteScrollComponent loadMore={() => setPage(page + 1)} dataLength={comments.length} hasMore={hasMore}>
                <ul>
                    {comments.map(comment => (
                        <DisplayComment key={comment._id} comment={comment} handleCommentDeleted={handleCommentDeleted} onReply={handleCommentAdded} />
                    ))}
                </ul>
            </InfiniteScrollComponent>
            {showErrorAlert && (<ErrorAlert message={showErrorAlert} onClose={() => setShowErrorAlert(false)}/>)}
        </div>
    );
}

export default CommentList;
