import { type } from "os"



export type resultMgMksOPType = {
    na: string,
    nm: string,
    ty: number,
    od: number,
    li: number

}

export type resultMgMksType = {
    op: Array<resultMgMksOPType>
    id: number,
    ss: number,
    au: number,
    mbl: number,
    li: string
}
export type resultMgType = {
    mty: number,
    pe: number,
    mks: Array<resultMgMksType>
    tps: Array<string>
    nm: string
    flag?: boolean
}


export type resultTypeItem = {
    pe: number,
    tyg: number,
    sc: Array<number>
}
export type resultLgType = {
    na: string,
    id: number,
    or: number,
    lurl: string,
    sid: number,
    rid: number,
    rnm: string,
    hot: boolean,
    slid: number
}
type resultTsType = {
    na: string,
    id: number,
    lurl: string
}
type resultMcType = {
    s: number,
    pe: number,
    r: boolean,
    tp: 1
}


export type resultType = {
    total: Array<resultMgType>
    nsg: Array<resultTypeItem>
    mg: Array<resultMgType>
    tms: number
    tps: Array<any>
    lg: resultLgType
    ts: Array<resultTsType>
    mc: resultMcType
    id: number;
    bt: number;
    ms: number;
    fid: number;
    fmt: number;
    ne: number;
    vs: {
        have: boolean;
    };
    as: string[];
    sid: number;
    smt: number;
    ty: number;
    nm: string;
    sb: {
        ihs: number,
        ias: number,
        rp: string,
        rd: number,
        sv: string,
        srr: number,
        bs: number,
        bb: number,
        bbs: string,
        bo: number;
        hhs: number,
        has: number,
        co: number,
        cd: number
    };
    ss: number;
    ssi: number;
    mp: string;
    ye: string;

}
export interface MatchDetail {
    success: boolean
    data: resultType
    code: number
}
export type bookSettleProp = {
    code: number,
    msg: string,
    data?: any
}
export type environment = {
    humidity: string,
    pressure: string,
    temperature: string,
    weather: string,
    weather_id: string,
    weather_image: string,
    wind: string,
}

type weatherItem = {
    environment: environment
    matchtime: number
    realtime: number
    round: number
    statusid: number
}
export interface weatherInfoType {
    data: weatherItem,
    errmsg?: string,
    errno?: number
}

export type textLiveProp = {
    data: string,
    eventTime: string,
    eventType: number,
    hwFlag: string,
    id: string,
    playerID: string,
    playerName: string,
    playerNameJ: string
}
export interface TextLiveType {
    data: Array<textLiveProp>,
    errmsg?: string,
    errno?: number
}
export type historyType = {
    list: Array<any>,
    weatherInforMation: environment,
    textLiveList: Array<textLiveProp>,
    isChoose: boolean
    disable: boolean
}

type sportsLangue = {
    [key: string]: string
}
export interface fbLangue {
    matchStatus: sportsLangue,
    period: sportsLangue,
    sports: sportsLangue,
    tournamentPhase: sportsLangue,
    marketType: sportsLangue,
    option: sportsLangue,
    matchPeriod: sportsLangue
}

export interface orderInfoItem {
    awayName: string;
    betOdds: number;
    betScore: string;
    createTime: string;
    eventId: string;
    handicap: string;
    homeName: string;
    id: number;
    isInplay: boolean;
    leaguePhase: number;
    market: number;
    marketId: string;
    marketName: string;
    marketType: number;
    matchName: string;
    matchPeriod: number;
    matchStatus: number;
    matchTime: string;
    matchType: number;
    odds: number;
    oddsType: number;
    optionName: string;
    optionType: number;
    settelScore: string;
    settleResult: number;
    settleStatus: number;
    sportId: number;
    tournamentId: string;
    tournamentName: string;
}
export type unSettleItem = {
    betAmount: number
    betStatus: number
    betType: string
    currency: number
    oddsChange: number
    orderInfo: Array<orderInfoItem>
    orderNo: string
    resettleStatus: number
    settleAmount: number
    tenantId: string
    unitStake: string
    userName: string
    validBetAmount: number
    validSettleAmount: number
    winloseStatus: number
    winlossAmount: number
}

type stsProp = {
    cid: number
    ct: number
    cwl: number
    pa: number
    sa: number
}
export interface pageData {
    current?: number
    list?: Array<unSettleItem>
    pages?: number
    sts?: Array<stsProp>
    total?: number
}

export type EventItem = {
    content: string,
    id: string,
    title: string,
    publishTime: number,
}
export interface EventsListProp {
    code: number,
    data: Array<EventItem>,
    msg?: string
}