import ArtistPage from '@/ArtistPage';
import { SoundlogBranding } from '@/icons/soundlogBranding';
import getSoundlog from '@/server/getSoundlog';
import cls from '@/utils/cls';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Metadata } from 'next';
import { grotesk, roboto } from './layout';
import { SoundlogResult } from '@/types/SoundlogResult';
import Head from 'next/head';

function getMeta(data: SoundlogResult): Metadata {
  const { soundlog, artist } = data;

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
      url: `https://${soundlog.id}.soundlog.link`,
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
  const { description, title, openGraph, twitter} = getMeta(data);
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="description" content={description!} />
        <meta name="rating" content="General" />
        <meta property="og:description" content={description!} />
        <meta name="twitter:description" content={description!} />
        <meta name="robots" content="nofollow" />
        <meta property="og:image" content={data.soundlog.cover_image} />
        <meta name="google" content="nositelinkssearchbox" />
        <meta property="og:title" content={title as string} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:type" content={(openGraph as any).type} />
        <meta property="og:url" content={(openGraph as any).url} />
        <meta name="twitter:title" content={title as string} />
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/favicon-16x16.png"
        />
        <link rel="manifest" href="/assets/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/assets/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/assets/favicon.ico" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="msapplication-config" content="/assets/browserconfig.xml" />
        <meta
          name="theme-color"
          content="#000"
          media="(prefers-color-scheme: light)"
        />

        <meta
          name="theme-color"
          content="#000"
          media="(prefers-color-scheme: dark)"
        />
        <script async defer src="/p/mount.js"></script>
      </Head>
      <body className={cls('dark', roboto.variable, grotesk.variable)}>
        <header className="footer_branding flex items-center w-full justify-center pt-4">
          <p>Build your own page.</p>
          <a href="https://soundlog.app/" target="_blank">
            {SoundlogBranding({
              width: 120,
              opacity: 1,
            })}
          </a>
        </header>
        <ArtistPage {...data} />;
        <SpeedInsights />
      </body>
    </>
  );
}
