const url = 'http://localhost:3001';

async function createArticles(formData) {
    try {
        const response = await fetch(`${url}/articles`, {
            method: 'POST',
            body: formData
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

export {createArticles, getArticles};