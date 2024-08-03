import { emptyResult, SoundlogResult } from '@/types/SoundlogResult';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const revalidate = 3600 * 6; // revalidate at most every 6h

const getSoundlog = async (): Promise<SoundlogResult> => {
  const forwardedHost = headers().get('X-Forwarded-Host');
  if (!forwardedHost) {
    return emptyResult;
  }

  //   const soundlogId = forwardedHost.split('.')[0];
  const soundlogId = 'armin';
  let market = 'US';

  if (!soundlogId) {
    return notFound();
  }

  const acceptLanguage = headers().get('Accept-Language'); // "es-ES,es;q=0.9"

  const parts = acceptLanguage?.split(',') ?? []; // ['es-ES', 'es;q=0.9']

  if (parts.length > 0) {
    market = parts[0]?.split('-')[1] ?? 'US';
  }
  console.log('fetching for', market);

  try {
    const response = await fetch(
      `https://fetcher.soundlog.app/v1/links/getSingles?soundlogId=${soundlogId}&market=${market}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await response.json();
    delete data.soundlog.created_at;
    delete data.soundlog.updated_at;

    return data;
  } catch (error) {
    return notFound();
  }
};

export default getSoundlog;
