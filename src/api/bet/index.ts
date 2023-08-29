
import ApiService from '@/api';
import { BetSinglePassApiRes, BetMultipleApiRes } from '@/enums/bet/betTypes';

export const getBetSinglePass = (params: any) => {
    return ApiService.post<BetSinglePassApiRes>('/order/order/singlePass', params);
}

export const getBetMultiple = (params: any) => {
    return ApiService.post<BetMultipleApiRes>('/order/order/betMultiple', params);
}
