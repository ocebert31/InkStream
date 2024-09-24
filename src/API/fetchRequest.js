const url = process.env.REACT_APP_API_URL;

async function fetchRequest(endpoint, { method = 'GET', body = null, token = null }) {
    try {
        const sanitizedBody = sanitizeBody(body)
        const response = await triggerFetch(endpoint, method, token, sanitizedBody)
        await ensureResponseIsOk(response)
        return response.json();
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

function sanitizeBody(body) {
    if (body && !(body instanceof FormData)) {
        body = JSON.stringify(body);
    }
    return body;
}

async function triggerFetch(endpoint, method, token, body) {
    const response = await fetch(`${url}${endpoint}`, {
        method,
        headers: {
            'Accept': 'application/json; charset=UTF-8',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...((body && !(body instanceof FormData)) && { 'Content-Type': 'application/json' }),
        },
        body: body || undefined, 
    });
    return response
}

async function ensureResponseIsOk(response) {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }
}

export { fetchRequest };