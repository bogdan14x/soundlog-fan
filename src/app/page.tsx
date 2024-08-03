import ArtistPage from '@/ArtistPage';
import getSoundlog from '@/server/getSoundlog';
import { Metadata } from 'next';
import { headers } from 'next/headers';

export async function generateMetadata(): Promise<Metadata> {
  const { soundlog, artist } = await getSoundlog();

  const forwardedHost = headers().get('x-forwarded-host');
  const soundlogId = forwardedHost?.split('.')[0] ?? null;

  return {
    title: `${soundlog.artist_name} on Soundlog`,
    description: `Discover ${soundlog.artist_name} on Soundlog`,
    twitter: {
      title: `${soundlog.artist_name} on Soundlog`,
      description: artist.bio,
      images: [soundlog.cover_image],
    },
    openGraph: {
      type: 'profile',
      url: soundlogId ? `https://${soundlogId}.soundlog.link` : "https://soundlog.app",
      title: `${soundlog.artist_name} on Soundlog`,
      description: `Discover ${soundlog.artist_name} on Soundlog`,
      siteName: `Soundlog | Build Your Artist Page`,
      images: [
        {
          url: soundlog.cover_image,
        },
      ],
    },
  };
}

export default async function Home() {
  const data = await getSoundlog();
  return <ArtistPage {...data} />;
}
