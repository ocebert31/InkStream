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

export {createArticles}