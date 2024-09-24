import { fetchRequest } from "./fetchRequest";

async function favoriteArticle(articleId, token) {
    return fetchRequest(`/favorites`, { method: 'POST', body: {articleId}, token });
}

export {favoriteArticle};