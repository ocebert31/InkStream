import {useEffect, useState} from "react";
const baseUrl = 'http://localhost:3001';

function useFetch (path, options = {}) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [errors, setErrors] = useState(null)

    useEffect(() => {
        const url = `${baseUrl}/${path}`;
        fetch(url, {
            ...options,
            headers: {
                'Accept': 'application/json; charset=UTF-8',
                ...options.headers
            }
        }).then(r => r.json()).then(data => {
            setData(data)
        }).catch((e) => {
            setErrors(e)
        }).finally(() => {
            setLoading(false)
        })
    }, [path, options]);

    return {
        loading, data, errors
    }
}

export default useFetch;