'use client';

import { useContext } from 'react';
import { ModalStateContext } from './AlbumModalContext';
import { Calendar } from './icons/calendar';
import { ModalClose } from './icons/modalClose';
import { AlbumPlatform, PlatformLink } from './PlatformLink';
import { Album, emptySoundlogAlbum } from './types/SoundlogResult';
import cls from './utils/cls';

export interface AlbumModalProps {
  soundlogAlbum: Album;
}

interface AnimationStyles {
  transform?: string;
  opacity?: number;
  pointerEvents?: string;
}
export const getrelease_date = (s: Album): string => {
  const d = new Date(s.release_date ?? '1997-02-20');
  const m = d.toLocaleString('default', { month: 'long' });
  return `${m} ${d.getDay()}, ${d.getFullYear()}`;
};
export const getClassNames = (classArray: string[]): string =>
  classArray.join(' ');

export const AlbumModal = () => {
  const {
    modalState,
    setModalState,
    album: soundlogAlbum,
    setAlbum,
  } = useContext(ModalStateContext);

  const image_large = soundlogAlbum.images?.find(
    (image) => image.height === 640,
  )?.url;

  return (
    <div
      className={cls(
        'z-50 pointer-events-none select-none transition-all duration-200ms ease-in-out',
        'fixed top-0 right-0 bottom-0 left-0',
      )}
      style={{
        pointerEvents: soundlogAlbum.name ? 'all' : 'none',
      }}
    >
      <div
        className="z-20 bg-black/95 opacity-0 pointer-events-none min-h-full min-w-full overflow-y-scroll transition-all duration-500ms ease-in-out"
        style={
          modalState
            ? { opacity: 1, transform: 'translate(0,0)', pointerEvents: 'all' }
            : {
                opacity: 0,
                transform: 'translate(0, 6em)',
                pointerEvents: 'none',
              }
        }
      >
        <div className="bg-gradient-to-b from-transparent from-0% to-black w-full h-screen absolute top-0 z-20 pointer-events-none"></div>
        <div className="z-10 h-[6rem] w-full text-right right-0 pt-3 pr-4 absolute bg-gradient-to-b from-black to-transparent">
          <button
            className="bg-transparent border-0 py-4 px-2 rounded-lg m-0 hover:bg-white/10"
            onClick={() => {
              setModalState(false);
              setAlbum(emptySoundlogAlbum);
            }}
          >
            {ModalClose({
              width: 32,
              height: 32,
            })}
          </button>
        </div>
        <div className="overflow-y-scroll h-screen relative">
          <div className="overflow-y-scroll h-[calc(100vh-4rem)] mt-10 font-grotesk">
            <div className="top-[2rem] left-[2rem] absolute opacity-45 w-[calc(100%-4rem)]">
              {image_large && (
                <div
                  className="translate-x-0 translate-y-[-2rem] blur-[120px] h-[25em] relative"
                  style={{
                    background: `url(${image_large})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                  }}
                />
              )}
            </div>
			<div className="spacer_XL" />
            {image_large && (
              <picture className="artwork_picture_tag z-40 relative">
                <source srcSet={image_large ?? ''} type="image/jpeg" />
                <img
                  className="max-w-[30vh] mx-auto rounded-lg"
                  src={image_large ?? ''}
                  alt="Album artwork"
                  loading="eager"
                  decoding="async"
                />
              </picture>
            )}
            <div className="spacer_M" />
            <div className="flex flex-col gap-2 justify-center w-full z-40 relative">
              <h3 className="self-start mx-auto font-grotesk font-bold text-2xl text-center">
                {soundlogAlbum.name}
              </h3>
              <h5 className="album_artists self-start mx-auto">
                {soundlogAlbum.artists?.map((artist) => artist.name).join(', ')}
              </h5>
            </div>
            <div className="spacer_M" />
            <div className="w-full flex gap-1 items-center justify-center text-sm z-40 relative">
              {soundlogAlbum.name ? (
                Calendar({
                  size: 24,
                })
              ) : (
                <></>
              )}
              <h6 className="release_date text-listItemSubtitle">
                {soundlogAlbum.name ? getrelease_date(soundlogAlbum) : ''}
              </h6>
            </div>
            <div className="spacer_XL" />
            <div className="max-w-[20rem] mx-auto flex flex-col gap-2 z-40 relative">
              <PlatformLink
                platform={AlbumPlatform.spotify}
                spotifyId={soundlogAlbum.id}
                url={soundlogAlbum.spotify}
                fullWidth
              />
              <PlatformLink
                platform={AlbumPlatform.apple}
                url={soundlogAlbum.apple}
                spotifyId={soundlogAlbum.id}
                fullWidth
              />
              <PlatformLink
                platform={AlbumPlatform.deezer}
                url={soundlogAlbum.deezer}
                spotifyId={soundlogAlbum.id}
                fullWidth
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
