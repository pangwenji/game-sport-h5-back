import { bookSettle, cancelCashReserve, earlyCheckout, fetchGameBetByChannelByService, fetchPrice, getEvents, queryOrderCashOut } from "@/api/notes"
import { EventsListProp, bookSettleProp, pageData, unSettleItem } from "@/interface"
import { useNotesStore } from "@/stores/notes"
import { useQuery } from "@tanstack/react-query"
import dayjs from 'dayjs';
import { any } from "video.js/dist/types/utils/events";
import { data } from "./useRealTime";
import { number } from "echarts";
import { CellMeasurerCache } from 'react-virtualized';
import { Toast } from 'antd-mobile'
type TimeProp = {
    startTime: number | string
    endTime: number | string
}

type listProp = {

    code: number,
    data: pageData,
    msg?: string

}
const handleList = async (result: listProp, type) => {
    let total = [];
    if (result.data.list.length > 0) {
        result.data.list.forEach(element => {
            if (element.orderInfo && element.orderInfo.length > 0) {
                element.orderInfo = element.orderInfo.forEach(ele => {
                    delete element['orderInfo']
                    total.push({
                        ...element,
                        ...ele
                    })
                }) as any;
            }
        })
        if (type == 'unSettle') {
            let unSettle = await getPrice(total);
            useNotesStore.setState({
                orderUnSettleNumber: result.data.sts[0]['ct'],//订单数
            })
            return unSettle;
        }
        if (type == 'settle') {
            let settle = await getPrice(total);
            useNotesStore.setState({
                orderNumber: result.data.sts[0]['ct'],//订单数
                betTotalAmount: result.data.sts[0]['sa'],//投注金额
                winOrLoss: result.data.sts[0]['cwl'],//公司输赢
            })
            return settle;
        }
    }
}
export const fetchGameBetByChannel = async (params, type) => {
    let result: listProp = await fetchGameBetByChannelByService(params)
    if (result && result?.code === 0) {
        useNotesStore.setState({
            totalPage: result.data.pages
        })
        return handleList(result, type)
    }
}

export const throttle = (fn, time) => {
    let timer = null;
    return function () {
        const context = this;
        const args = arguments;
        if (timer) return
        timer = setTimeout(() => {
            fn.apply(context, args)
            timer = null
        }, time)
    }
}


const getPrice = async (params: Array<any>) => {
    let orderList = [];
    let userName;
    let total = []
    params.forEach(ele => {
        orderList.push(ele.orderNo);
        userName = ele.userName
    })
    try {
        let result = await fetchPrice({ userName: userName, channelType: 1, orderNos: orderList });
        if (result && result.code === 0) {
            if (result.data.pr) {
                result.data.pr.forEach(element => {
                    for (let i = 0; i < params.length; i++) {
                        if (element.oid === params[i]['orderNo']) {
                            total.push({ ...element, ...params[i] })
                        }
                    }
                })
            }
        }
    } catch (error) { }
    return total;
}

export const getYesTodayDate = (): TimeProp => {
    let currentDay = dayjs(new Date()).format('YYYY-MM-DD')
    let yesterday = dayjs(new Date(currentDay).getTime() - 86400000).format('YYYY-MM-DD');
    return { startTime: new Date(`${dayjs(yesterday).startOf('date')}`).getTime(), endTime: new Date(`${dayjs(yesterday).endOf('date')}`).getTime() };
}


//获取时间
export const getPassSevenDate = () => {
    const today = dayjs();
    const sevenDaysAgo = today.subtract(7, 'day');
    let endTime = new Date(today.format('YYYY-MM-DD')).getTime();
    let startTime = new Date(sevenDaysAgo.format('YYYY-MM-DD')).getTime();
    return { startTime, endTime }
}


export const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 340,
})
export const formatStatus = (value: number) => {
    let obj = {
        0: '未确认',
        1: '确认中',
        2: '已拒单',
        3: '已取消',
        4: "已接单",
        5: "已结算"
    }
    return obj[value]
}

export const formatMark = (value: number) => {
    let obj = {
        0: '滚球',
        1: '今日',
        2: '早盘',
        3: '冠军'
    }
    return obj[value];
}

export const calculate = (betAmount: number, oddsValue: number): number => Number(parseFloat(`${betAmount * oddsValue}`).toFixed(2));


export const plate = (value: number) => {
    let obj = {
        1: "欧洲盘",
        2: "香港盘",
        3: "马来盘",
        4: "印尼盘",
    }
    return obj[value]
}

export const calculateSettle = (betAmount: number, amt: number) => betAmount * amt;


const queryOrderStatus = async (args) => {
    try {
        let result = await queryOrderCashOut(args);
        if (result.code === 0) {
            if (result.data.length > 0) {
                let { unSettleList } = useNotesStore.getState();
                for (let i = 0; i < unSettleList.length; i++) {
                    if (unSettleList[i].orderNo === result.data[0].orderNo) {
                        unSettleList[i].betStatus = result.data[0].orderStatus;
                    }
                }
            }
        }

    } catch (error) { }

}

export const earlySettlement = async (item, value, amt) => {
    let param = {
        userName: localStorage.getItem('userName'),
        channelType: 1,
        orderNo: item.orderNo,
        cashOutAmount: Number(value),
        unitCashOutPayoutAmount: amt,
        acceptOddsChange: true,
        seriesType: item.seriesType
    }
    let result: { code: number, msg?: string, data?: { cashOutId: number, status: number } } = await earlyCheckout(param);
    let args = {
        userName: localStorage.getItem('userName'),
        channelType: 1,
        cashOutIds: [result?.data?.cashOutId],
    }
    if (result.code === 0) {
        Toast.show({
            content: result.msg
        })
        queryOrderStatus(args)
    } else {
        Toast.show({
            content: result?.msg,
        })
    }
}

export const calculateAdd = (a: number, b: number): number => a + b


//预约结算
export const bookSettlement = async (eaCheckout, settlementReturn) => {
    let { orderNo, seriesType } = useNotesStore.getState()
    let param = {
        userName: localStorage.getItem('userName'),
        channelType: 1,
        orderNo: orderNo,
        cashOutAmount: Number(eaCheckout),
        cashOutPayoutAmount: Number(settlementReturn),
        seriesType: seriesType
    }
    let result: { code: number, data: pageData, msg?: string } = await bookSettle(param)
    if (result.code !== 0) {
        Toast.show({
            content: result.msg,
        })
    }
}


export const cancelOrder = async (item) => {
    let param = {
        userName: localStorage.getItem('userName'),
        channelType: 1,
        reserveCashOutId: item.orderNo
    }
    let result: { code: number, msg?: string } = await cancelCashReserve(param)
    if (result.code === 0) {
        Toast.show({
            content: result.msg,
        })
    } else {
        Toast.show({
            content: result.msg,
        })
    }
}

export const formTime = (timeShip) => dayjs(timeShip).format('YYYY-MM-DD HH:MM:ss');

export const handleSettle = (item): boolean => {
    let label: boolean = false;
    if (item.cashOutOrders.length > 0) {
        item.cashOutOrders.forEach(ele => {
            if (ele.type === 1 && [1, 4].includes(ele.orderStatus)) {
                label = true
            }
        })
    }
    return label
}

export const setMin = (seriesType, sMins, pMis) => {
    return seriesType === 1 ? pMis : sMins;
}

export const appointCancellation = async (args) => {
    try {
        let params = {
            userName: localStorage.getItem('userName'),
            channelType: 1,
            reserveCashOutId: args['cashOutOrders'][0]['reserveCashOutId']
        }
        let result = await cancelCashReserve(params);
        if (result.code === 0) {
            useNotesStore.setState({
                isShowButton: false
            })
        }
    } catch (error) { }
}

export const form = (value: number) => parseFloat(`${value}`).toFixed(2)


export const WinnableAmount = (betAmount: number, val: number) => val - betAmount;

export const rebate = (values, amt) => parseFloat(`${values * amt}`).toFixed(2);

export const handleSettleDetail = (item) => {
    if (Reflect.has(item, 'cashOutPayoutAmount') && item['cashOutPayoutAmount'] > 0) {
        return true
    }
    return false;
}

export const remainingPrincipal = (betAmount, cashOutAmount) => betAmount - cashOutAmount;

export const handleBetAmount = (betAmount, cashOutAmount) => {
    if (cashOutAmount) {
        return cashOutAmount
    }
    return betAmount;
}

export const calculateStake = (betAmount, item) => {
    if (!item?.cashOutPayoutAmount) {
        return betAmount
    }
    let total = betAmount - item.cashOutAmount;
    return parseFloat(`${total}`).toFixed(2)
}

export const handeAdanceSettlement = (item) => {
    if (!item.cashOutAmount) {
        let value = item.betAmount * item.amt
        return parseFloat(`${value}`).toFixed(2)
    }

    let final = item.betAmount - item.cashOutAmount;
    return parseFloat(`${final}`).toFixed(2)
}

export const handleMinAndMax = (minValue, maxValue) => {
    if (minValue > maxValue) {
        return `${minValue}-${minValue}`
    }
    return `${minValue}-${maxValue}`
}

export const getEventsAnnouncements = async (param) => {
    let result: EventsListProp = await getEvents(param);
    if (result && result.code === 0) {
        useNotesStore.setState({
            eventsList: result.data
        })
        return new Promise((resolve, reject) => {
            resolve(result.data)
        }).catch(e => {
            throw Error(e)
        })
    } else {
        Toast.show({
            content: result.msg,
            position: 'top'
        })
    }
}