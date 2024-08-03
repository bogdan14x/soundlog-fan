"use client"

import { createContext, useState } from "react";
import { Album, emptySoundlogAlbum } from "./types/SoundlogResult";

interface ModalState {
    modalState: boolean;
    setModalState: (modalState: boolean) => void;
    album: Album;
    setAlbum: (album: Album) => void;
}

export const ModalStateContext = createContext<ModalState>({
    modalState: false,
    setModalState: () => {},
    album: emptySoundlogAlbum,
    setAlbum: () => {},
});

export const ModalStateProvider = ({ children }: { children: React.ReactNode }) => {
    const [modalState, setModalState] = useState(false);
    const [album, setAlbum] = useState(emptySoundlogAlbum);

    return (
        <ModalStateContext.Provider
            value={{
                modalState,
                setModalState: (modalState: boolean) => setModalState(modalState),
                album,
                setAlbum: (album: Album) => setAlbum(album),
            }}
        >
            {children}
        </ModalStateContext.Provider>
    );
};
