import { StoreSlice } from "./useUserStore";

export interface LocaleSlice {
    value: string;
    setLocale: (newLocale: string) => void;
}

export const createLocaleSlice: StoreSlice<LocaleSlice> = (set) => ({
    value: '',
    setLocale: (newLocale: string) => {
        set((state) => ({
            locale: {
                ...state.locale,
                value: newLocale
            }
        }));
    }
})