import { create, StoreApi } from 'zustand'
import { createTokenSlice, TokenSlice } from './userTokenSlice'
import { createUserInfoSlice, UserInfoSlice } from './userInfoSlice'
import { createLocaleSlice, LocaleSlice } from './userLocaleSlice';
import { devtools, persist, createJSONStorage } from "zustand/middleware";

interface StoreState {
    token: TokenSlice;
    user: UserInfoSlice;
    locale: LocaleSlice;
}

export type StoreSlice<T extends object> = (
    set: StoreApi<StoreState>['setState'],
    get: StoreApi<StoreState>['getState']
) => T;

function deepMerge(savedState: StoreState, currentState: StoreState): StoreState {
    return {
        user: {
            ...currentState.user,
            ...savedState.user
        },
        token: {
            ...currentState.token,
            ...savedState.token
        },
        locale: {
            ...currentState.locale,
            ...savedState.locale
        },
    };
}

export const useUserStore = create<StoreState>()(
    devtools(
        persist(
            (set, get) => ({
                token: createTokenSlice(set, get),
                user: createUserInfoSlice(set, get),
                locale: createLocaleSlice(set, get),
            }),
            {
                name: 'user-info',
                partialize: (state) => {
                    const { token, locale } = state;
                    return {
                        token,
                        locale
                    };
                },
                merge: (state, partialState) => deepMerge(state as StoreState, partialState),
                // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
            }
        )
    )
);