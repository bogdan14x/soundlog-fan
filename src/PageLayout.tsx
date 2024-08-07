import { useEffect, useState } from 'react';
import { AlbumModal } from './AlbumModal';
import { ArtistAlbumItem } from './ArtistAlbumItem';
import { SocialBar } from './SocialBar';
import { Album, SoundlogResult } from './types/SoundlogResult';
import cls from './utils/cls';
import { h3Styling } from './utils/global';
import Image from 'next/image';

export default function PageLayout({
  soundlog,
  artist,
  albums,
  next_ids,
}: SoundlogResult) {
  const [nextAlbums, setNextAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const loadNextAlbums = async () => {
    try {
      setIsLoading(true);

      const params = new URLSearchParams();
      params.append('album_ids', next_ids.join(','));

      const response = await fetch(`/api/getSingles?${params.toString()}`) 

      if (!response.ok) {
        return setHasError(true);
      }
      const { albums } = await response.json();
      setNextAlbums(albums);

    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.plausible =
      window.plausible ||
      function (...args: any[]) {
        (window.plausible.q = window.plausible.q || []).push(args);
      };

    if (next_ids.length > 0 && !isLoading) {
      loadNextAlbums();
    }
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
            width={900}
            height={386}
            priority
            style={{ objectFit: 'cover' }}
            decoding="async"
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
        <SocialBar data={{ soundlog, artist, albums, next_ids }} />
        <h3 className={cls(h3Styling, 'py-2')}>Latest release</h3>
        <ul className="flex flex-col gap-4 list-none">
          {Object.values(albums).length > 0 &&
            Object.values(albums).map((album, idx) => (
              <li key={album.id}>
                <ArtistAlbumItem
                  soundlogAlbum={album}
                  size={idx === 0 ? 'large' : 'small'}
                />
              </li>
            ))}
          <li key="more">
            <p className="font-grotesk mb-2">
              More from {soundlog.artist_name}
            </p>
            {isLoading ? (
              <div className="skeleton flex flex-col gap-3 py-2 animate-pulse">
                <div className="w-full h-[7em] rounded-xl bg-white opacity-10"></div>
                <div className="w-full h-[7em] rounded-xl bg-white opacity-10"></div>
                <div className="w-full h-[7em] rounded-xl bg-white opacity-10"></div>
              </div>
            ) : (
              <>
                {
                  !hasError && Object.values(nextAlbums).length > 0 ? (
                    Object.values(nextAlbums).map((album) => (
                      <ArtistAlbumItem
                        key={album.id}
                        soundlogAlbum={album}
                        size="small"
                      />
                    ))
                  ) : <p>Error getting albums.</p>
                }
              </>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}
