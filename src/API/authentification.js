const url = process.env.REACT_APP_API_URL;

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

async function postConfirmation(token) {
    try {
        const response = await fetch(`${url}/auth/confirmation/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        const responseData = await response.json();
        const { user } = responseData;
        return { user };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function updateAvatarOptions(token, avatarOptions) {
    try {
        const response = await fetch(`${url}/auth/avatar-options`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ avatarOptions }),
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to update avatar options', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour des options d\'avatar', error);
        return null;
    }
}

async function updateEmail(newEmail, currentPassword, token) {
    try {
        const response = await fetch(`${url}/auth/update-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ newEmail, currentPassword })
        });

        if (response.ok) {
            return await response.json();
        } else {
            const data = await response.json();
            throw new Error(data.message || 'Erreur lors de la mise à jour de l\'e-mail.');
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'adresse e-mail.', error);
        throw error;
    }
}

async function updatePassword(currentPassword, newPassword, confirmNewPassword, token) {
    try {
        const response = await fetch(`${url}/auth/update-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ currentPassword, newPassword, confirmNewPassword })
        });

        if (response.ok) {
            return await response.json();
        } else {
            const data = await response.json();
            throw new Error(data.message || 'Erreur lors de la mise à jour de l\'e-mail.');
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'adresse e-mail.', error);
        throw error;
    }
};

async function forgotPassword(email) {
    try {
        const response = await fetch(`${url}/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        if (response.ok) {
            return await response.json();
        } else {
            const data = await response.json();
            throw new Error(data.message);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function postResetPassword(token, newPassword, confirmNewPassword) {
    try {
        const response = await fetch(`${url}/auth/reset-password/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newPassword, confirmNewPassword })
        });

        if (response.ok) {
            console.log(response)
            return await response.json();
        } else {
            const data = await response.json();
            throw new Error(data.message);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getUserData(token) {
    try {
        const response = await fetch(`${url}/auth/userData`, {
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
        console.error(error);
        throw error;
    }
}

export {postInscription, postSession, postConfirmation, updateAvatarOptions, updateEmail, updatePassword, forgotPassword, postResetPassword, getUserData};