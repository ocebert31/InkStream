const url = process.env.REACT_APP_API_URL;

async function voteComment (commentId, voteType, token) {
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

export {voteComment};