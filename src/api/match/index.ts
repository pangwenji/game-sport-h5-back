
import ApiService from '@/api';
import { MatchListApiRes, MatchStatisticsApiRes, SportFileTypeApiRes } from '@/enums/sports/matchTypes';

// 赛事列表
export const getMatchList = (params) => {
    return ApiService.post<MatchListApiRes>('/game/v1/match/getList', params);
}

// 赛事统计
export const getMatchStatistical = (params) => {
    return ApiService.post<MatchStatisticsApiRes>('/game/v1/match/statistical', params);
}

// 体育枚举
export const getLanguageFileStreamByType = (params) => {
    return ApiService.post<SportFileTypeApiRes>('/game/v1/language/codeName', params);
}


// 获取联赛列表
export const getOnSaleLeagues = (params) => {
    return ApiService.post<MatchStatisticsApiRes>('/game/v1/match/getOnSaleLeagues', params);
}