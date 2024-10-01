import { fetchRequest } from "./apiRequest";

async function favoriteArticle(articleId, token) {
    return fetchRequest(`/favorites`, { method: 'POST', body: {articleId}, token });
}

export {favoriteArticle};