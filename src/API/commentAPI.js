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

async function getComments(articleId) {
        const response = await fetch(`${url}/comments?articleId=${articleId}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des commentaires');
        }
        const comments = await response.json();
        return comments;
}

export {postComment, getComments}