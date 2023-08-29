import { create } from 'zustand'

interface SportsState {
    ids: number[]
    updateIds: (ids: number[]) => void
}

export const useSportsStore = create<SportsState>((set) => ({
    ids: [],
    updateIds: (newIds) => {
        set({ ids: newIds })
    },
}))


