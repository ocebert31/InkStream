const url = 'http://localhost:3001';

async function postComment(content, articleId, token) {
    try {
        const response = await fetch(`${url}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({content, articleId}),
        });
        if (!response.ok) {
            throw new Error("Erreur lors de l'ajout du commentaire");
        }
        return await response.json();
    } catch (error) {
        console.error('Error posting comment:', error);
        throw error;
    }
};

async function getComments(articleId, token) {
    let headers = {};
    if(token) {
        headers = { ...headers, 'Authorization': `Bearer ${token}` };
    }
    const response = await fetch(`${url}/comments?articleId=${articleId}`, { headers });
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des commentaires');
    }
    const comments = await response.json();
    return comments;
}

async function deleteComment(id, token) {
    try {
        const response = await fetch(`${url}/comments/${id}`, {
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

async function updateComment (id, content, token) {
    try {
        const response = await fetch(`${url}/comments/${id}`, {
            method: 'PUT',
            body: JSON.stringify({content}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
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

export {postComment, getComments, deleteComment, updateComment}