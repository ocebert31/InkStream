const url = process.env.REACT_APP_API_URL;

async function commentVote (commentId, voteType, token) {
    const response = await fetch(`${url}/votes/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ commentId, voteType })
    });
    if (!response.ok) {
        throw new Error('Failed to vote');
    }
    return response.json();
};

const voteOnArticle = async (articleId, voteType, token) => {
    try {
        const response = await fetch(`${url}/votes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, 
            },
            body: JSON.stringify({ articleId, voteType }),
        });
        if (!response.ok) {
            throw new Error('Failed to vote');
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
};

export {commentVote, voteOnArticle};


