import { useState, useEffect, useCallback } from 'react';

export default function useFetch(url, options = {}, deps = []) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
          // eslint-disable-next-line no-undef
          const res = await fetch(url, options);
          if (!res.ok) throw new Error(`Error: ${res.status}`);
          const json = await res.json();
          setData(json);
        } catch (err) {
            setError(err);
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [url, JSON.stringify(options)]);

    useEffect(() => {
        fetchData();
    }, [fetchData, ...deps]);

    return { data, error, loading, refetch: fetchData };
}
