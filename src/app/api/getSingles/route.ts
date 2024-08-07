import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const market = headers().get('x-vercel-ip-country') ?? 'US'; // "es-ES,es;q=0.9"

  const searchParams = request.nextUrl.searchParams;
  const album_ids = searchParams.get('album_ids');

  const res = await fetch(
    `https://fetcher.soundlog.app/v1/links/getSingles?market=${market.toUpperCase()}&album_ids=${album_ids}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const data = await res.json();

  return Response.json(data);
}
