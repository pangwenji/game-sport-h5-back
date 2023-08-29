import { environment, historyType, resultMgType, resultType, textLiveProp } from "@/interface"
import { create } from "zustand";
import { persist } from 'zustand/middleware'

export const useMatchDetailStore = create(persist(() => ({
    totalMaster: [],
    drawTotal: [],
    vistTotal: [],
    recordMg: [],
    total: [],//备份用
    nsg: [],
    mg: [],
    tms: 0,
    tps: [],
    lg: {} as any,
    ts: [],
    mc: {} as any,
    id: 0,
    bt: 0,
    ms: 0,
    fid: 0,
    fmt: 0,
    ne: 0,
    vs: null,
    as: [],
    sid: 0,
    smt: 0,
    ty: 0,
    nm: '',
    sb: {
        ihs: 0,
        ias: 0,
        rp: '',
        rd: 0,
        sv: '',
        srr: 0,
        bs: 0,
        bb: 0,
        bbs: '',
        bo: 0,
        hhs: 0,
        has: 0,
        co: 0,
        cd: 0
    },
    ss: 0,
    ssi: 0,
    mp: '',
    ye: '',

    Marchid: 0,//赛事ID
    haveVs: {
        flvSD: '',
        web: '',
        m3u8SD: '',
        have: false
    },
    haveAs: [],//是否有动画
    type: 0,//类型
    sportId: 0,
}), { name: 'detailStore' }));

export const useCalculation = create(() => ({
    isShowKeyboard: true

}))

export const useActiveKeyStore = create<{ activeKeyTriple: string[], activeKeySingle: string[], activeKeyDouble: string[] }>(() => ({
    activeKeySingle: [],
    activeKeyDouble: [],
    activeKeyTriple: []
}))
export const setActiveKey = (type, value: string[]) => {
    if (type === 'single') {
        useActiveKeyStore.setState({ activeKeySingle: value })
    } else if (type === 'double') {
        useActiveKeyStore.setState({ activeKeyDouble: value })
    } else if (type === 'triple') {
        useActiveKeyStore.setState({ activeKeyTriple: value })
    }
}

export const changesShowKeyboardStatus = (value: boolean) => {
    useCalculation.setState({ isShowKeyboard: value })
}


export const useShowAll = create(() => ({
    showAll: false
}))

export const useHistoryStore = create<historyType>(() => ({
    list: [],
    weatherInforMation: {
        humidity: '',
        pressure: '',
        temperature: '',
        weather: '',
        weather_id: '',
        weather_image: '',
        wind: '',
    },
    textLiveList: [],
    isChoose: false,
    disable: true,
}))


export const basketball = [
    { name: '实时', key: 'realTime' },
    { name: '分析', key: 'analysis' },
    { name: '情报', key: 'cuttingEdgeNews' },
]
export const matchFormatFooterBall = [
    ...basketball,
    { name: '阵容', key: 'lineup' },
]
