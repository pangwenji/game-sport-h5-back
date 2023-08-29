import ApiService from '@/api';

// 登陆
export const loginApi = (params) => {
    return ApiService.post('/v1/login', params);
}

// 注册
export const createMemberApi = (params) => {
    return ApiService.post('/game/member/createMember', params);
}

// 获取用户钱包余额
export const getMemberWalletBalanceApi = (params) => {
    return ApiService.post('/order/wallet/getMemberWalletBalance', params);
}

// 登出
export const logoutApi = (params) => {
    return ApiService.post('/v1/logout', params);
}

// UserInfo
export const getUserInfo = (params) => {
    return ApiService.post('/bootstrap', params, { baseURL: "2k", timeout: 60000 });
}