const url = process.env.REACT_APP_API_URL;

async function postComment(content, articleId, commentId, token) {
    try {
        const response = await fetch(`${url}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({content, articleId, commentId}),
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

async function getComments(articleId, token, page = 1, limit = 20) {
    let headers = {};
    const params = new URLSearchParams({articleId, page, limit}).toString();
    if(token) {
        headers = { ...headers, 'Authorization': `Bearer ${token}` };
    }
    const response = await fetch(`${url}/comments?${params}`, { headers });
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des commentaires');
    }
    const comments = await response.json();
    const commentAndReplies = [];
    comments.forEach(comment => {
        if(commentIsReply(comment)) {
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
            if(!comment.replies) {
                comment.replies = [];
            }
            comment.replies.push(reply);
        }
    }
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

export {postComment, getComments, deleteComment, updateComment};