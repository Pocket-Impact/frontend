export const apiFetch = async (url: string, options: RequestInit = {}) => {
    const isServer = typeof window === 'undefined';
    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';

    if (isServer && url.startsWith('/')) {
        url = baseUrl + url; // prepend base url on server
    }

    let response = await fetch(url, {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });


    if (response.status === 401) {
        await fetch(baseUrl + '/api/auth/refresh-token',
            {
                method: 'POST',
                credentials: 'include'
            },
        )

        response = await fetch(url, {
            ...options,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            }
        })
    }

    return response;
}