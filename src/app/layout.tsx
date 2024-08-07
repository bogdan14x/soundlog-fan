import localFont from 'next/font/local';
import './globals.css';

export const roboto = localFont({
  src: [
    {
      path: '../fonts/Roboto-Regular.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-roboto',
});
export const grotesk = localFont({
  src: [
    {
      path: '../fonts/HKGrotesk-Regular.woff',
      weight: '400',
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
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {children}
    </html>
  );
}
