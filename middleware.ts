import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken');
    const refreshToken = request.cookies.get('refreshToken');

    // Protect feedback routes
    if (!accessToken && !refreshToken) {
        return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
    // If accessToken is missing but refreshToken exists, try to refresh
    if (!accessToken && refreshToken) {
        try {
            const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/refresh-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `refreshToken=${refreshToken.value}`,
                },
            });
            if (refreshRes.ok) {
                const setCookie = refreshRes.headers.get('set-cookie');
                if (setCookie) {
                    const response = NextResponse.next();
                    response.headers.set('set-cookie', setCookie);
                    return response;
                }
            }
            return NextResponse.redirect(new URL('/auth/signin', request.url));
        } catch {
            return NextResponse.redirect(new URL('/auth/signin', request.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/feedback/:path*'],
};
