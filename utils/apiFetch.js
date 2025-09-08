export const apiFetch = async (url, options = {}) => {
    const isServer = typeof window === 'undefined';

    let response = await fetch(url, {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (response.status === 401) {
        await fetch('/api/auth/refresh-token', {
            method: 'POST',
            credentials: 'include',
        });

        response = await fetch(url, {
            ...options,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
    }

    return response;
}