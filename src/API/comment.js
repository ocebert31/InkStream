import { fetchRequest } from "./fetchRequest";

async function postComment(content, articleId, commentId, token) {
    return fetchRequest(`/comments`, { method: 'POST', body: {content, articleId, commentId}, token });
}

async function getComments(articleId, token, page = 1, limit = 20) {
    const params = new URLSearchParams({ articleId, page, limit }).toString();
    const comments = await fetchRequest(`/comments?${params}`, { method: 'GET', token });
    return orderComments(comments)
}

function orderComments(comments) {
    const commentAndReplies = [];
    comments.forEach(comment => {
        if (commentIsReply(comment)) {
            attachReplyToParentComment(commentAndReplies, comment);
        } else {
            commentAndReplies.push(comment);
        }
    });
    return commentAndReplies;
}

function commentIsReply(comment) {
    return comment.commentId;
}

function attachReplyToParentComment(commentAndReplies, reply) {
    for (let comment of commentAndReplies) {
        if (comment._id === reply.commentId) {
            initReplies(comment);
            comment.replies.push(reply);
        }
    }
}

function initReplies(comment) {
    if (!comment.replies) {
        comment.replies = [];
    }
}

async function deleteComment(id, token) {
    return fetchRequest(`/comments/${id}`, { method: 'DELETE', token });
}

async function updateComment(id, content, token) {
    return fetchRequest(`/comments/${id}`, { method: 'PUT', body: {content}, token });
}

export {postComment, getComments, deleteComment, updateComment};