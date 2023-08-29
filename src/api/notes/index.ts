import http from '@/api'
import { MatchDetail } from '@/interface';
export const getEventAnnouncements = (param) => http.post(`/bulletin/listTop`, param);

export const fetchGameBetByChannelByService = (param) => http.post(`/order/bet/orderBet/list`, param);
export const fetchPrice = (param) => http.post(`/order/order/cashOut/price`, param);



export const earlyCheckout = (param) => http.post(`/order/order/cashOut/bet`, param);

export const bookSettle = (param) => http.post(`/order/order/cashOutReserve/bet`, param);

//需要轮询查找order状态
export const queryOrderCashOut = (param) => http.post(`/order/order/cashOut/queryCashOut`, param);

//取消提前结算
export const cancelCashReserve = (param) => http.post(`/order/order/cashOutReserve/cancel`, param);


//获取赛事公告
export const getEvents = (param) => http.post(`/game/bulletin/listTop`, param);