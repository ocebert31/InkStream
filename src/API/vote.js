import { fetchRequest } from "./fetchRequest";

const url = process.env.REACT_APP_API_URL;

async function vote(vote, token) {
    return fetchRequest(`/votes`, { method: 'POST', body: vote, token });
}

export {vote};


