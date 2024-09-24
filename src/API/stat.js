import { fetchRequest } from "./fetchRequest";

async function getAllStat(token) {
    return fetchRequest(`/admin/stat`, { method: 'GET', token });
}

export {getAllStat}