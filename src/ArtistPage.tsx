'use client';

import { ModalStateProvider } from './AlbumModalContext';
import PageLayout from './PageLayout';
import { SoundlogResult } from './types/SoundlogResult';

export default function ArtistPage(data: SoundlogResult) {
  return (
    <ModalStateProvider>
      <PageLayout {...data} />
    </ModalStateProvider>
  );
}
