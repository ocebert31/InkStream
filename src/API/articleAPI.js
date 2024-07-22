const url = 'http://localhost:3001';

async function createArticles(formData, token) {
    try {
        const response = await fetch(`${url}/articles`, {
            method: 'POST',
            body: formData,
            headers: {'Authorization': `Bearer ${token}`}
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        return await response.json();
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

async function getArticles(page = 1, limit = 20) {
    const response = await fetch(`${url}/articles?page=${page}&limit=${limit}`);
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des articles');
    }
    const articles = await response.json();
    return articles;
}

async function getOneArticle(id) {
    const response = await fetch(`${url}/articles/${id}`)
    if (!response.ok) {
        throw new Error("Erreur lors de la récupération de l'article");
    }
    const article = await response.json();
    return article;
}

async function deleteArticle(id, token) {
    try {
        const response = await fetch(`${url}/articles/${id}`, {
            method: 'DELETE',
            headers: {'Authorization': `Bearer ${token}`}
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

async function updateArticle (id, formData, token) {
    try {
        const response = await fetch(`${url}/articles/${id}`, {
            method: 'PUT',
            body: formData,
            headers: {'Authorization': `Bearer ${token}`}
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export {createArticles, getArticles, getOneArticle, deleteArticle, updateArticle};