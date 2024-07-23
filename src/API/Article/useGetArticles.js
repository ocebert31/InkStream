import useFetch from "../useFetch";

function useGetArticles (searchQuery = '', page = 1, limit = 20) {
    const {data, loading, errors} = useFetch(`articles?searchQuery=${searchQuery}&page=${page}&limit=${limit}`);
    return {
        loading, articles: data, errors
    }
}

export default useGetArticles;