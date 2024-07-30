const url = 'http://localhost:3001';

async function favoriteArticle (articleId, token) {
    const response = await fetch(`${url}/favorites/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ articleId })
    });

    if (!response.ok) {
        throw new Error('Failed to favorite');
    }

    return response.json();
};

export {favoriteArticle};