export const apiFetch = async (url: string, options: RequestInit = {}) => {
<<<<<<< HEAD
=======
    const isServer = typeof window === 'undefined';

>>>>>>> 7b86845a8b1cf13899b4bd13c272958ddb02b008
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