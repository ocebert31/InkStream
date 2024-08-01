const url = process.env.REACT_APP_API_URL;

async function getArticles(searchQuery = '', page = 1, limit = 20, type = 'all', token = null) {
    const params = new URLSearchParams({searchQuery, page, limit, type}).toString();
    const urlGetArticles = `${url}/articles?${params}`;
    try {
        const response = await fetch(urlGetArticles, {
            method: 'GET',
            headers: {
                'Accept': 'application/json; charset=UTF-8',
                ...(token && { 'Authorization': `Bearer ${token}` }) 
            }
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

async function getOneArticle(id, token) {
    const response = await fetch(`${url}/articles/${id}`, {
        headers: {'Authorization': `Bearer ${token}`}
    })
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

export {getArticles, createArticles, getOneArticle, deleteArticle, updateArticle};