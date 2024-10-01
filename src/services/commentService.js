import { fetchRequest } from "./apiRequest";

async function postComment(content, articleId, commentId, token) {
    return fetchRequest(`/comments`, { method: 'POST', body: {content, articleId, commentId}, token });
}

async function getComments(articleId, token, page = 1, limit = 20) {
    const params = new URLSearchParams({ articleId, page, limit }).toString();
    return fetchRequest(`/comments?${params}`, { method: 'GET', token });
}

async function deleteComment(id, token) {
    return fetchRequest(`/comments/${id}`, { method: 'DELETE', token });
}

async function updateComment(id, content, token) {
    return fetchRequest(`/comments/${id}`, { method: 'PUT', body: {content}, token });
}

export {postComment, getComments, deleteComment, updateComment};