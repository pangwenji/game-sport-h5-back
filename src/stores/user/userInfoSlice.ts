

import { StoreSlice } from "./useUserStore";

export interface UserInfoSlice {
    value: boolean;
    setUserInfo: (newUserInfo: boolean) => void;
}

export const createUserInfoSlice: StoreSlice<UserInfoSlice> = (set, get) => ({
    value: false,
    setUserInfo: (newUserInfo: boolean) => {
        set((state) => ({
            user: {
                ...state.user,
                value: newUserInfo
            }
        }));
    }
})
