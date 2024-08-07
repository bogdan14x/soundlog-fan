export interface SoundlogResult {
  albums: { [key: string]: Album };
  next_ids: string[];
  soundlog: SoundlogDocument;
  artist: ArtistData;
}

export const emptyResult: SoundlogResult = {
  albums: {},
  next_ids: [],
  soundlog: {
    user_id: '',
    id: '',
    socials: {
      instagram: '',
      tiktok: '',
      x: '',
      youtube: '',
      soundcloud: '',
      facebook: '',
      threads: '',
    },
    artist_id: '',
    artist_name: '',
    artist_avatar: '',
    cover_image: '',
  },
  artist: {
    coverImage: '',
    socials: {
      items: [],
    },
    bio: '',
  },
};

export interface AlbumModalProps {
  soundlogAlbum: Album;
}

export interface ArtistData {
  coverImage: string;
  socials: ArtistSocials;
  bio: string;
}

export interface ArtistSocials {
  items: Item[];
}

export interface Item {
  name: string;
  url: string;
}

export interface SoundlogDocument {
  user_id: string;
  socials: SocialLinks;
  artist_id: string;
  id: string;
  artist_name: string;
  artist_avatar: string;
  cover_image: string;
}
export interface SocialLinks {
  instagram: string;
  tiktok: string;
  x: string;
  youtube: string;
  soundcloud: string;
  facebook: string;
  threads: string;
}

export interface Album {
  deezer: string;
  spotify: string;
  apple: string;
  images: Image[];
  name: string;
  label: string;
  id: string;
  release_date: string;
  artists: Artist[];
}

export const emptySoundlogAlbum: Album = {
  deezer: '',
  spotify: '',
  apple: '',
  images: [],
  name: '',
  id: '',
  label: '',
  release_date: '2024-02-02',
  artists: [],
};

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}
