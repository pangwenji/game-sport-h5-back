import { StoreSlice } from "./useUserStore";

export interface TokenSlice {
    value: string;
    setToken: (newToken: string) => void;
}

export const createTokenSlice: StoreSlice<TokenSlice> = (set, get) => ({
    value: '',
    setToken: (newToken: string) => {
        set((state) => ({
            token: {
                ...state.token,
                value: newToken
            }
        }));
    }
})