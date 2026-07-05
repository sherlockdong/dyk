import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { token } = await request.json();

    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            secret: process.env.TURNSTILE_SECRET_KEY,
            response: token,
        }),
    });

    const data = await verifyRes.json();

    if (!data.success) {
        return NextResponse.json({ success: false }, { status: 403 });
    }

    const res = NextResponse.json({ success: true });
    res.cookies.set('human_verified', 'true', {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 6, // 6 hours
        path: '/',
    });
    return res;
}