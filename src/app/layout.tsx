import type { Metadata } from 'next';
import './globals.css';
import cls from '@/utils/cls';
import localFont from 'next/font/local';
import { SpeedInsights } from '@vercel/speed-insights/next';

const roboto = localFont({
  src: [
    {
      path: '../fonts/Roboto-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Roboto-Medium.woff',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-roboto',
});
const grotesk = localFont({
  src: [
    {
      path: '../fonts/HKGrotesk-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/HKGrotesk-Light.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/HKGrotesk-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/HKGrotesk-SemiBold.woff',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-grotesk',
});

export const metadata: Metadata = {
  title: 'Soundlog',
  description: 'Build your artist page',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta charSet="UTF-8" />
      <meta name="Description" content={metadata.description!} />
      <meta name="rating" content="General" />
      <meta property="og:description" content={metadata.description!} />
      <meta name="twitter:description" content={metadata.description!} />
      <meta name="robots" content="nofollow" />
      <meta name="google" content="nositelinkssearchbox" />
      <meta property="og:title" content={metadata.title as string} />
      <meta name="twitter:title" content={metadata.title as string} />
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
      <body className={cls('dark', roboto.variable, grotesk.variable)}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
