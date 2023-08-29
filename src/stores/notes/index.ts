import { EventItem, orderInfoItem, unSettleItem } from "@/interface";
import dayjs from "dayjs";
import { flatten } from "lodash";
import { create } from "zustand";

type betOptionListITem = {
    marketId: number
    optionType: number
    oddsFormat: number
    odds: number
}

type timeShipProp = {
    startTime: string | number,
    endTime: string | number
}

type NotesProp = {
    betOptionList: Array<betOptionListITem>,
    unSettleList: Array<unSettleItem>,
    settleList: Array<unSettleItem>,
    timesShip: timeShipProp,
    active: string,
    isShowDialog: boolean
    userName: string,
    orderNo: null | number,
    seriesType: null | number,
    cashOutAmount: number,
    cashOutPayoutAmount: number
    betAmount: number,
    amt: number,
    oddsValue: number,
    sMins: number | any,
    pMis: number | any
    isShowButton: boolean,
    totalPage: number,
    orderNumber: number,
    betTotalAmount: number,
    winOrLoss: number
    orderUnSettleNumber: number,
    eventsList: Array<EventItem>
}

export const useNotesStore = create<NotesProp>(() => ({
    betOptionList: [
        { marketId: 65054516, odds: 7.25, optionType: 1, oddsFormat: 1 },
        { marketId: 64407233, odds: 1.94, optionType: 1, oddsFormat: 1 }
    ],
    unSettleList: [],
    settleList: [],
    timesShip: {
        startTime: new Date(`${dayjs().startOf('date')}`).getTime(),
        endTime: new Date(`${dayjs().endOf('date')}`).getTime()
    },
    active: 'unSettle',
    isShowDialog: true,
    userName: '',
    orderNo: null,
    seriesType: null,
    cashOutAmount: 0,
    cashOutPayoutAmount: 0,
    betAmount: 0,
    amt: 0,
    oddsValue: 0,
    sMins: 0,
    pMis: 0,
    isShowButton: false,
    totalPage: 1,
    orderNumber: 0,
    betTotalAmount: 0,
    winOrLoss: 0,
    orderUnSettleNumber: 0,
    id: 0,
    vs: {
        have: false
    },
    as: [],
    type: 0,
    sid: 0,
    eventsList: []
}))


