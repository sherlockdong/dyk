import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    // 1. Extract the IP address provided by Vercel/Hosting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown IP';
    const path = request.nextUrl.pathname;

    // Log it to your Vercel/server console so you can see it working
    console.log(`[Visitor Log] IP: ${ip} accessed ${path}`);

    // 2. ONLY trigger an email if they try to access sensitive paths
    // (This prevents your inbox from getting flooded by regular page visits)
    if (path.startsWith('/') || path.includes('.env') || path.includes('wp-admin')) {
        try {
            await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: 'Security <alerts@sherlockdong.us>',
                    to: 'sherlockdong2007@gmail.com', // Put your actual email here
                    subject: `⚠️ Suspicious Activity Alert (${ip})`,
                    text: `An unexpected visitor at IP ${ip} tried to access ${path} at ${new Date().toISOString()}.`,
                }),
            });
        } catch (error) {
            console.error('Failed to send security alert email:', error);
        }
    }

    // Allow the request to proceed normally
    return NextResponse.next();
}

// 3. The Matcher: Tells Next.js exactly which routes to run this code on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};