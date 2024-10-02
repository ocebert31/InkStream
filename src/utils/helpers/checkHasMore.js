export const checkHasMore = (fetchedComments, limit, setHasMore) => {
    if (fetchedComments.length < limit) {
        setHasMore(false);
    } else {
        setHasMore(true);
    }
};
