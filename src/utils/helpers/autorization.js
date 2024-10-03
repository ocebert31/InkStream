export const isAuthor = (user, source) => {
    return user && (user._id === source.userId || user.role === 'admin');
}