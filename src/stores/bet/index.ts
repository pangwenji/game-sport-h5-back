import { create } from "zustand";

type betOptionListITem = {
    marketId: number
    matchId: number
    optionType: number
    oddsFormat: number
    odds: number
}

// 单关投注数据 bettSinglePassOption(下注接口用)
type BetSinglePassProps = {
    betSinglePassOption: Array<betOptionListITem>
}
export const useBetSinglePassOptionStore = create<BetSinglePassProps>(() => ({
    betSinglePassOption: [
        // {marketId:65497301,odds:1.9,optionType:2,oddsFormat:1},
    ],
}))
export const updatedBetSinglePassOptionStatus = (value: Array<betOptionListITem>) => {
    useBetSinglePassOptionStore.setState({ betSinglePassOption: value })
}

// 单关数据betSinglePassMarketList(查询列表用)
interface BetSinglePassMarketListState {
    betSinglePassMarketList: object[]
    updateBetSinglePassMarketList: (betSinglePassMarketList: object[]) => void
}
export const useBetSinglePassMarketListStore = create<BetSinglePassMarketListState>((set) => ({
    betSinglePassMarketList: [
        // {marketId:65066056,matchId:1563011,type:1},
        // {matchId:666, marketId:65066056,matchId:1563011,type:1},
    ],
    updateBetSinglePassMarketList: (obj) => {
        set({ betSinglePassMarketList: obj })
    },
}))



// 串关投注数据betOptionList(下注接口用)
type BetsProps = {
    betOptionList: Array<betOptionListITem>
}
export const useBetOptionListStore = create<BetsProps>(() => ({
    betOptionList: [
        // {marketId:65497301,odds:1.9,optionType:2,oddsFormat:1},
    ],
}))
export const updatedBetOptionListStatus = (value: Array<betOptionListITem>) => {
    useBetOptionListStore.setState({ betOptionList: value })
}


// 串关数据betMatchMarketList(查询列表用)
interface BetMatchMarketListState {
    betMatchMarketList: object[]
    updateBetMatchMarketList: (betMatchMarketList: object[]) => void
}
export const useBetMatchMarketListStore = create<BetMatchMarketListState>((set) => ({
    betMatchMarketList: [
        // {"marketId":66395131,"matchId":1594707,"type":1},

    ],
    updateBetMatchMarketList: (obj) => {
        set({ betMatchMarketList: obj })
    },
}))


// 是否串关isSelectSeries
interface IsSelectSeriesState {
    isSelectSeries: boolean
    updateIsSelectSeriesState: (isSelectSeries: boolean) => void
}
export const useIsSelectSeriesStore = create<IsSelectSeriesState>((set) => ({
    isSelectSeries: false,
    updateIsSelectSeriesState: (value) => {
        set({ isSelectSeries: value })
    },
}))


// 投注列表数据batchBetMatchMarketOfJumpLineData
interface batchBetMatchMarketOfJumpLineDataState {
    batchBetMatchMarketOfJumpLineData: object
    updatebatchBetMatchMarketOfJumpLineData: (batchBetMatchMarketOfJumpLineData: object) => void
}
export const usebatchBetMatchMarketOfJumpLineDataStateStore = create<batchBetMatchMarketOfJumpLineDataState>((set) => ({
    batchBetMatchMarketOfJumpLineData: {
        bms: [
            {
                mid: 65794845,
                op: {
                    na: "南部联合",
                    nm: "南部联合 +0/0.5",
                    ty: 1,
                    od: 1.75,
                    li: +0 / 0.5,
                    otcm: 0
                },
                smin: 10,
                smax: 3000,
                au: 1,
                ss: 1,
                ip: 0
            },
            {
                mid: 65817614,
                op: {
                    na: "马可尼 U20",
                    nm: "马可尼 U20 -1.5/2",
                    ty: 1,
                    od: 1.82,
                    li: -1.5 / 2,
                    otcm: 0
                },
                smin: 10,
                smax: 3000,
                au: 1,
                ss: 1,
                ip: 0
            }
        ],
        sos: [
            {
                sn: 2,
                in: 1,
                sodd: 3.185,
                mi: 5,
                mx: 3000
            }
        ],
        mon: 10,
        msl: 10
    },
    updatebatchBetMatchMarketOfJumpLineData: (obj) => {
        set({ batchBetMatchMarketOfJumpLineData: obj })
    },
}))

