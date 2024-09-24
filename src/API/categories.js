import { fetchRequest } from "./fetchRequest";

async function createCategories(data, token) {
    return fetchRequest(`/categories`, { method: 'POST', body: data, token });
}

async function getCategories() {
    return fetchRequest(`/categories`, { method: 'GET' });
}

async function deleteCategory(id, token) {
    return fetchRequest(`/categories/${id}`, { method: 'DELETE', token });
}

async function updateCategory(id, name, token) {
    return fetchRequest(`/categories/${id}`, { method: 'PUT', body: {name}, token });
}

export {createCategories, getCategories, deleteCategory, updateCategory}