// app/api/visitor-info/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // 1. Grab the headers sent from Cloudflare through Vercel
  const headersList = request.headers;
  
  // 2. Extract the actual visitor IP provided by Cloudflare
  const clientIp = headersList.get('cf-connecting-ip') || 
                   headersList.get('x-forwarded-for') || 
                   'IP not found';
                   
  // 3. Cloudflare also passes the country code (e.g., "US", "CA", "GB")
  const country = headersList.get('cf-ipcountry') || 'Unknown';

  // 4. Log it to your Vercel console so you can see it
  console.log(`[Visitor Alert] IP: ${clientIp} | Country: ${country}`);

  return NextResponse.json({ 
    success: true, 
    yourIp: clientIp, 
    yourCountry: country 
  });
}