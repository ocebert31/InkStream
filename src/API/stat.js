const url = process.env.REACT_APP_API_URL;

async function getAllStat(token) {
    try {
        const response = await fetch(`${url}/admin/stat`, {
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

export {getAllStat}