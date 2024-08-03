/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import cls from './utils/cls';
import { tileBorder, tileGradient } from './utils/global';

export interface PlatformLinkProps {
  platform: AlbumPlatform;
  url: string;
  spotifyId: string;
  fullWidth?: boolean;
  onClick?: () => void;
}

export enum AlbumPlatform {
  apple = 'apple',
  deezer = 'deezer',
  spotify = 'spotify',
  tidal = 'tidal',
  youtube = 'youtube',
}

export const getPlatformTitle = (p: AlbumPlatform): string => {
  switch (p) {
    case AlbumPlatform.spotify:
      return 'Spotify';
    case AlbumPlatform.apple:
      return 'Apple Music';
    case AlbumPlatform.deezer:
      return 'Deezer';
    case AlbumPlatform.tidal:
      return 'Tidal';
    case AlbumPlatform.youtube:
      return 'YouTube';
  }
};

export const PlatformLink = ({
  platform,
  fullWidth = false,
  onClick,
  url,
  spotifyId,
}: PlatformLinkProps) => {
  const [isClicked, setIsClicked] = useState(false);
  // const platformURL = getPlatformURL(platform, idForUrl)
  const platformTitle = getPlatformTitle(platform);

  const handlePlatformClick = (): void => {
    setIsClicked(true);
  };

  const trackingClasses = [
    `platform_link_button`,
    `plausible-event-name=outbound_click:${platform}:${spotifyId}`,
  ];

  return (
    <a
      href={url}
      title={`Link to song on ${platformTitle}`}
      rel="noopener noreferrer"
      onClick={onClick ?? handlePlatformClick}
      className="relative"
    >
      <button
        className={cls(
          'grid place-items-center py-3',
          ...trackingClasses,
          "bg-black",
          tileBorder,
          'relative',
        )}
        style={{ width: fullWidth ? '100%' : 'unset' }}
      >
        <div
          className={cls(
            'absolute top-0 left-0 bottom-0 right-0 z-10',
            isClicked ? 'opacity-100' : 'opacity-100',
          )}
        >
          <div
            className={cls(
              'h-full w-full bg-white/5 rounded-lg',
              'transition-all ease-in-out',
              'fill-forwards iteration-1 origin-left',
            )}
            style={{ transform: isClicked ? 'scaleX(1)' : 'scaleX(0)', transitionDuration: '0.8s' }}
          ></div>
        </div>
        <img
          className="platform_svg mx-auto"
          src={`/img/${platform}.svg`}
          alt={`Link to song on ${platformTitle}`}
          loading="eager"
          decoding="async"
        />
      </button>
    </a>
  );
};
