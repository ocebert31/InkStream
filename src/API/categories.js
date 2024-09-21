const url = process.env.REACT_APP_API_URL;

async function createCategories(data, token) {
    try {
        const response = await fetch(`${url}/categories`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'}
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

async function getCategories(token) {
    try {
        const response = await fetch(`${url}/categories`, {
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

export {createCategories, getCategories}