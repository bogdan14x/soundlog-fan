'use client';

import { ModalStateProvider } from './AlbumModalContext';
import PageLayout from './PageLayout';
import { SoundlogResult } from './types/SoundlogResult';

export default function ArtistPage({
  soundlog,
  artist,
  albums,
}: SoundlogResult) {
  return (
    <ModalStateProvider>
      <PageLayout soundlog={soundlog} artist={artist} albums={albums} />
    </ModalStateProvider>
  );
}
