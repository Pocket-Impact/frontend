export const apiFetch = async (url, options = {}) => {
  // eslint-disable-next-line no-unused-vars
  const isServer = typeof window === "undefined";
  
  // eslint-disable-next-line no-undef
  let response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (response.status === 401) {
    // eslint-disable-next-line no-undef
    await fetch("/api/auth/refresh-token", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // eslint-disable-next-line no-undef
    response = await fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  }

  return response;
};
