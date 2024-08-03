import React from 'react';
import { getImageProps } from 'next/image';

export interface IPicture {
  imageSrc: PictureMapping[];
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: Record<string, string>;
}

interface PictureMapping {
  minSize: number;
  src: string;
}

export default function Picture({ imageSrc, alt, className = '', width, height, style = {} }: IPicture) {
  const common = { alt, width, height };

  return (
    <picture className={className} style={style}>
      {imageSrc.map(({ minSize, src }) => (
        <source key={`${alt}_${minSize}`} media={`(min-width: ${minSize}rem)`} srcSet={getImageProps({ ...common, src }).props.srcSet} />
      ))}
      <img {...getImageProps({ ...common, src: imageSrc[0]?.src ?? "" }).props} alt={alt} />
    </picture>
  );
}
