const apiKey = process.env.REACT_APP_GIPHY_API_KEY;
const baseUrl = process.env.REACT_APP_GIPHY_API_BASE_URL;

async function getGifs(searchQuery) {
    const url = `${baseUrl}?api_key=${apiKey}&q=${searchQuery}&limit=10`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des GIFs');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export { getGifs };