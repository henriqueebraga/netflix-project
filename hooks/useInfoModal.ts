import { create } from 'zustand';

export interface InfoModalState {
    isOpen: boolean;
    movieId?: string;
    closeModal: () => void;
    openModal: (movieId: string) => void;
}

const useInfoModal = create<InfoModalState>((set) => ({
    isOpen: false,
    movieId: undefined,
    closeModal: () => set({ isOpen: false, movieId: undefined }),
    openModal: (movieId) => set({ isOpen: true, movieId }),
}));

export default useInfoModal;