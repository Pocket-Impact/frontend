export const apiFetch = async (url: string, options: RequestInit = {}) => {
    const isServer = typeof window === 'undefined';
    // Use NEXT_PUBLIC_BACKEND_URL for client, BACKEND_URL for server
    let baseUrl = isServer
        ? process.env.BACKEND_URL
        : process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!baseUrl) {
        throw new Error('Backend URL is not set. Please define NEXT_PUBLIC_BACKEND_URL in your .env file for client-side, and BACKEND_URL for server-side.');
    }

    // Ensure protocol is present
    if (!/^https?:\/\//.test(baseUrl)) {
        baseUrl = 'http://' + baseUrl;
    }

    url = baseUrl + url;

    let response = await fetch(url, {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (response.status === 401) {
        await fetch(baseUrl + '/api/auth/refresh-token', {
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