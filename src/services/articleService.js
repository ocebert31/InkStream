import { fetchRequest } from "./apiRequest";

async function getArticles(searchQuery = '', page = 1, limit = 20, type = 'all', token = null, categoryId = null) {
    const params = new URLSearchParams({ searchQuery, page, limit, type, categoryId }).toString();
    return fetchRequest(`/articles?${params}`, { method: 'GET', token });
}

async function createArticles(formData, token) {
    return fetchRequest(`/articles`, { method: 'POST', body: formData, token });
}

async function getOneArticle(id, token) {
    return fetchRequest(`/articles/${id}`, { method: 'GET', token });
}

async function deleteArticle(id, token) {
    return fetchRequest(`/articles/${id}`, { method: 'DELETE', token });
}

async function updateArticle(id, formData, token) {
    return fetchRequest(`/articles/${id}`, { method: 'PUT', body: formData, token });
}

export { getArticles, createArticles, getOneArticle, deleteArticle, updateArticle };
