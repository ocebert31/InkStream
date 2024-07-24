const url = 'http://localhost:3001';

async function postInscription(data) {
  try {
    const response = await fetch(`${url}/auth/registration`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }
  return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function postSession(data) {
  try {
    const response = await fetch(`${url}/auth/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const responseData = await response.json();
    const { user, token } = responseData;
    return { user, token };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export {postInscription, postSession};