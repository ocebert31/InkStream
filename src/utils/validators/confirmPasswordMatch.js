export const confirmPasswordMatch = (setCheckConfirmPassword, password, confirmPassword) => {
    if (password !== confirmPassword) {
        setCheckConfirmPassword('Les mots de passe ne correspondent pas.');
        return;
    }
}