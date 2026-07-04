import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown IP';
    const path = request.nextUrl.pathname;

    // 1. VPN / PROXY DETECTION
    // We skip the proxy check for local development IPs so you don't lock yourself out
    if (ip !== '::1' && ip !== '127.0.0.1' && ip !== 'Unknown IP') {
        try {
            const proxyResponse = await fetch(`https://v2.api.iphub.info/ip/${ip}`, {
                headers: { 'X-Key': process.env.IPHUB_API_KEY || '' }
            });

            if (proxyResponse.ok) {
                const data = await proxyResponse.json();

                // Block value 1 (VPN/Proxy) or 2 (Mixed/Suspicious)
                if (data.block === 1 || data.block === 2) {
                    return new NextResponse('Access Denied: VPN or Proxy connections are restricted.', { status: 403 });
                }
            }
        } catch (error) {
            // Fails silently if the proxy API goes down, allowing traffic to pass normally
        }
    }

    // 2. SECURITY EMAIL ALERTS
    // IMPORTANT: Make sure you don't use path.startsWith('/') in production
    if (path.startsWith('/admin') || path.includes('.env') || path.includes('wp-admin') || path.includes('.git')) {
        try {
            await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: 'Security <alerts@sherlockdong.us>',
                    to: 'sherlockdong2007@gmail.com',
                    subject: `⚠️ Suspicious Activity Alert (${ip})`,
                    text: `An unexpected visitor at IP ${ip} tried to access ${path} at ${new Date().toISOString()}.`,
                }),
            });
        } catch (error) {
            // Fails silently
        }
    }

    // 3. ALLOW NORMAL TRAFFIC
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};