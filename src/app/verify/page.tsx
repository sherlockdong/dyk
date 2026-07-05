'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Script from 'next/script';

function VerifyContent() {
    const params = useSearchParams();
    const router = useRouter();
    const redirectTo = params.get('redirect') || '/';
    const [error, setError] = useState('');
    const [scriptLoaded, setScriptLoaded] = useState(false);

    async function onVerify(token: string) {
        const res = await fetch('/api/verify-turnstile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
        });

        if (res.ok) {
            router.push(redirectTo);
        } else {
            setError('Verification failed, please try again.');
        }
    }

    useEffect(() => {
        function handleToken(e: Event) {
            const token = (e as CustomEvent).detail;
            onVerify(token);
        }
        window.addEventListener('turnstile-token', handleToken);
        (window as any).onTurnstileSuccess = (token: string) => {
            window.dispatchEvent(new CustomEvent('turnstile-token', { detail: token }));
        };
        return () => window.removeEventListener('turnstile-token', handleToken);
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '4rem' }}>
            <Script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                async
                defer
                onLoad={() => setScriptLoaded(true)}
            />
            <h1>Quick check</h1>
            <p>Please verify you&apos;re human to continue.</p>
            {scriptLoaded && (
                <div
                    className="cf-turnstile"
                    data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                    data-callback="onTurnstileSuccess"
                />
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default function VerifyPage() {
    return (
        <Suspense fallback={<div style={{ textAlign: 'center', marginTop: '4rem' }}>Loading...</div>}>
            <VerifyContent />
        </Suspense>
    );
}