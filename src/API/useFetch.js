import {useEffect, useState, useMemo} from "react";
const baseUrl = 'http://localhost:3001';

function useFetch (path, options = {}) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [errors, setErrors] = useState(null);

    const memoizedOptions = useMemo(() => JSON.stringify(options), [options]);

    useEffect(() => {
        const url = `${baseUrl}/${path}`;
        fetch(url, {
            ...memoizedOptions,
            headers: {
                'Accept': 'application/json; charset=UTF-8',
                ...memoizedOptions.headers
            }
        }).then(r => r.json()).then(data => {
            setData(data)
        }).catch((e) => {
            setErrors(e)
        }).finally(() => {
            setLoading(false)
        })
    }, [path, memoizedOptions]);

    return {
        loading, data, errors
    }
}

export default useFetch;