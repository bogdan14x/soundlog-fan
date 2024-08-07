import { emptyResult, SoundlogResult } from '@/types/SoundlogResult';
import dayjs from 'dayjs';
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

  const market = headers().get('x-vercel-ip-country') ?? 'US'; // "es-ES,es;q=0.9"

  const timerLabel = 'getSoundlog'.concat(
    dayjs().format('YYYY-MM-DD_HH:mm:ss'),
  );
  try {
    console.time(timerLabel);
    const response = await fetch(
      `https://fetcher.soundlog.app/v1/links/getSingles?soundlogId=${soundlogId}&market=${market.toUpperCase()}`,
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
  } finally {
    console.timeEnd(timerLabel);
  }
};

export default getSoundlog;
