import { fetchRequest } from "./apiRequest";

async function postInscription(data) {
    return fetchRequest(`/auth/registration`, { method: 'POST', body: data });
}

async function postSession(data) {
    return fetchRequest(`/auth/session`, { method: 'POST', body: data });
}

async function postConfirmation(token) {
    return fetchRequest(`/auth/confirmation/${token}`, { method: 'POST'});
}

async function updateAvatarOptions(token, avatarOptions) {
    return fetchRequest(`/auth/avatar-options`, { method: 'PUT', body: {avatarOptions}, token });
}

async function updateEmail(newEmail, currentPassword, token) {
    return fetchRequest(`/auth/update-email`, { method: 'POST', body: {newEmail, currentPassword}, token });
}

async function updatePassword(currentPassword, newPassword, confirmNewPassword, token) {
    return fetchRequest(`/auth/update-password`, { method: 'POST', body: { currentPassword, newPassword, confirmNewPassword }, token });
}

async function forgotPassword(email) {
    return fetchRequest(`/auth/forgot-password`, { method: 'POST', body: { email } });
}

async function postResetPassword(token, newPassword, confirmNewPassword) {
    return fetchRequest(`/auth/reset-password/${token}`, { method: 'POST', body: { newPassword, confirmNewPassword }, token });
}

async function getUserData(token) {
    return fetchRequest(`/auth/userData`, { method: 'GET', token });
}

export {postInscription, postSession, postConfirmation, updateAvatarOptions, updateEmail, updatePassword, forgotPassword, postResetPassword, getUserData};