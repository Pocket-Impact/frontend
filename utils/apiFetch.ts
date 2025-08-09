export const apiFetch = async (url: string, options: RequestInit = {}) => {
    let response = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });


    if (response.status === 401) {
        await fetch('/api/auth/refresh-token', {
            method: 'POST'
        })

        response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            }
        })
    }

    return response;
}