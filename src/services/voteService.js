import { fetchRequest } from "./apiRequest";

async function vote(vote, token) {
    return fetchRequest(`/votes`, { method: 'POST', body: vote, token });
}

export {vote};


