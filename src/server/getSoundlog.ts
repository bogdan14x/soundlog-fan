import { emptyResult, SoundlogResult } from '@/types/SoundlogResult';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

export const revalidate = 3600; // revalidate at most every hour

const getSoundlog = async (): Promise<SoundlogResult> => {
  const forwardedHost = headers().get('x-forwarded-host');
  if (!forwardedHost) {
    return emptyResult;
  }

  const soundlogId = forwardedHost.split('.')[0];
  //   const soundlogId = 'armin';
  if (!soundlogId) {
    return notFound();
  }

  const market = headers().get('x-vercel-ip-country') ?? 'GB'; // "es-ES,es;q=0.9"

  // const start = performance.now();

  try {
    const response = await fetch(
      `https://fetcher.soundlog.app/v1/links/getLatest?soundlogId=${soundlogId}&market=${market.toUpperCase()}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-vercel-deployment-url':
            headers().get('x-vercel-deployment-url') ?? '',
        },
      },
    );
    const data = await response.json();
    delete data.soundlog.created_at;
    delete data.soundlog.updated_at;

    return data;
  } catch (error) {
    return notFound();
  } finally {
    // const end = performance.now(); // End the timer
    // const duration = end - start; // Calculate duration
    // console.log(`Soundlog Fetch Duration: ${duration} milliseconds`);
  }
};

export default getSoundlog;
