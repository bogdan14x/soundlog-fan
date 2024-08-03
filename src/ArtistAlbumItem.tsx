import { useContext } from 'react';
import { Album } from './types/SoundlogResult';
import { ModalStateContext } from './AlbumModalContext';
import cls from './utils/cls';
import { buttonActive, tileBorder, tileGradient } from './utils/global';
import { ChevronRight } from './icons/chevronRight';
import Picture from './Picture';

export interface ArtistAlbumItemProps {
  size: 'small' | 'large';
  soundlogAlbum: Album;
}

export const ArtistAlbumItem = ({
  size,
  soundlogAlbum,
}: ArtistAlbumItemProps) => {
  const { release_date, images, name } = soundlogAlbum;
  const image_small = images.find((image) => image.height === 64)?.url;
  const image_medium = images.find((image) => image.height === 300)?.url;
  const image_large = images.find((image) => image.height === 640)?.url;

  const { setAlbum, setModalState } = useContext(ModalStateContext);

  const parsedDate = new Date(release_date ?? '1997-02-20');

  return (
    <button
      className={cls(
        'select-none p-2 hover:cursor-pointer hover:border-offWhite',
        'transition-all duration-200ms ease-in-out relative text-left w-full',
        tileBorder,
        tileGradient,
        buttonActive,
      )}
      onClick={() => {
        setAlbum(soundlogAlbum);
        setModalState(true);
      }}
    >
      <div className="absolute grid right-0 h-full place-items-center mt-[-4px]">
        {ChevronRight({})}
      </div>
      <div className="relative flex gap-1">
        <Picture
          style={{ maxWidth: size === "small" ? "30vw" : "35vw" }}
          className="min-h-[88px] min-w-[88px] overflow-hidden rounded-lg shrink-0"
          alt={`Album artwork for ${name}`}
          width={size === 'small' ? 180 : 280}
          height={size === 'small' ? 180 : 280}
          imageSrc={[{
            minSize: 37.5,
            src: image_large!,
          },
          {
            minSize: 20,
            src: image_medium!,
          }]}
        />
        <div className="flex flex-col justify-evenly px-3">
          <div className="flex flex-col gap-2 py-1">
            <h3
              className={cls(
                'grow justify-start font-grotesk font-bold',
                size === 'small' ? 'text-base' : 'text-xl',
              )}
            >
              {name}
            </h3>
            <h5 className="font-grotesk text-sm text-subtitle">
              {soundlogAlbum.artists?.map((artist) => artist.name).join(', ')}
            </h5>
            {size === 'small' && name.length > 30 ? (
              <></>
            ) : (
              <div className="album_info_release grow">
                <h6 className="text-xs text-subtitle">
                  Single ◦ {release_date ? parsedDate.getFullYear() : <></>}
                </h6>
                <div className="spacer_XXS" />
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};
