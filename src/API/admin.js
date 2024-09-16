const url = process.env.REACT_APP_API_URL;

async function getUsers(searchQuery = '', page = 1, limit = 20, token = null) {
    const params = new URLSearchParams({ searchQuery, page, limit }).toString();
    const urlGetUsers = `${url}/admin?${params}`;

    try {
        const response = await fetch(urlGetUsers, {
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

async function updateUserRole (userId, newRole, token) {
    const response = await fetch(`${url}/admin/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
    });

    if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du rôle');
    }

    return await response.json();
};

export { getUsers, updateUserRole };
