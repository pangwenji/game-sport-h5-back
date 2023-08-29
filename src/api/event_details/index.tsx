import http from '@/api'
import { MatchDetail } from '@/interface';
import { listProp } from '@/pages/sports/SportsDetail/component/header';
// 获取单个赛事详情及玩法
export const getMatchDetail = (param) => http.post<MatchDetail>('/game/v1/match/getMatchDetail', param);

//获取详情
export const getList = (param) => http.post<listProp>('/game/v1/match/getList', param);

//视频
export const sportUnionData = ({ ts, language }) => http.get(`match/sportUnionData?ts=${ts}&language=${language}`);

//天气
export const fetchWeatherInfo = ({ id, plat, t }) => http.get(`api/match/zq/matchInfo?id=${id}&plat=${plat}&t=${t}`);

//文字直播列表
export const fetchTextLiveInfo = ({ id, plat, t }) => http.get(`api/score/zq/TextLive?id=${id}&plat=${plat}&t=${t}`);

//投注前查询指定玩法赔率
export const queryTheOddOfBetting = (param) => http.post('/order/playOdds/order/batchBetMatchMarketOfJumpLine', param);