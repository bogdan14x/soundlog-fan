import { useEffect } from 'react';
import { AlbumModal } from './AlbumModal';
import { ArtistAlbumItem } from './ArtistAlbumItem';
import { SocialBar } from './SocialBar';
import { SoundlogResult } from './types/SoundlogResult';
import cls from './utils/cls';
import { h3Styling } from './utils/global';
import Image from 'next/image';

export default function PageLayout({
  soundlog,
  artist,
  albums,
}: SoundlogResult) {
  useEffect(() => {
    window.plausible =
      window.plausible ||
      function (...args: any[]) {
        (window.plausible.q = window.plausible.q || []).push(args);
      };
  }, []);

  return (
    <>
      <AlbumModal />
      <div className="p-5">
        <div className="hero_image flex justify-center flex-col">
          <Image
            className="relative h-[40vw] max-h-[280px] overflow-hidden rounded-xl"
            src={
              soundlog.cover_image !== ''
                ? soundlog.cover_image
                : artist.coverImage
            }
            alt="Artist hero image."
            width="2660"
            height="1140"
            priority
            objectFit='cover'
            decoding='async'
          />
          <div className="dark_overlay" />
        </div>
        <div className="flex items-center gap-3 py-2">
          <span className="font-grotesk text-2xl font-semibold">
            {soundlog.artist_name}
          </span>
          <span className="m-0 self-center rounded-xl bg-accent px-2 text-[0.6rem] font-bold">
            PRO
          </span>
        </div>
        <SocialBar data={{ soundlog, artist, albums }} />
        <h3 className={cls(h3Styling, 'py-2')}>Latest release</h3>
        <ul className="flex flex-col gap-4 list-none">
          {Object.values(albums).length > 0 &&
            Object.values(albums).map((album, idx) => (
              <li key={album.id}>
                {idx === 1 ? (
                  <p className="font-grotesk mb-2">
                    More from {soundlog.artist_name}
                  </p>
                ) : (
                  <></>
                )}
                <ArtistAlbumItem
                  soundlogAlbum={album}
                  size={idx === 0 ? 'large' : 'small'}
                />
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
