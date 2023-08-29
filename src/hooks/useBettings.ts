import { fetchTextLiveInfo, fetchWeatherInfo, getList, getMatchDetail, queryTheOddOfBetting, sportUnionData } from "@/api/event_details";
import { BallGamesEnum, MarketTagEnum } from "@/enums/market_tag";
import { MatchDetail, TextLiveType, fbLangue, resultMgMksOPType, resultMgMksType, resultMgType, weatherInfoType } from "@/interface"
import { basketball, matchFormatFooterBall, useHistoryStore, useMatchDetailStore } from "@/stores/sports-detail";
import { marketType } from "@/utils/market_type";
import { match_format } from "@/utils/match_format";
import { useQuery } from '@tanstack/react-query';
import { PreviousValueArray } from './useRecordValue';
import dayjs from 'dayjs';
interface recordType<T1, T2> {
    0: T1
    1: T2
}
//记录上一次值跟当前
export const recordValue: recordType<number, number> = [0, 1557783]
class RecordValue<T>{
    public previousValue: T | undefined = undefined;
    recordCurrentValue(currentValue: T): { previous: T, current: T } {
        let object = {
            previous: this.previousValue,
            current: currentValue
        }
        this.previousValue = currentValue;//置换当前和上一次值
        return object;
    }
}


export const handleSingleData = (array: Array<any>): Array<resultMgMksOPType> => {
    let total = [];
    array.forEach(element => {
        element.op.forEach(item => {
            total.push({
                ...item,
                au: element.au,//是否支持串关，0 不可串关，1 可串关
                id: element.id,//玩法Id
                li: element.li,//line值，带线玩法的线，例如大小球2.5线，部分玩法展示可用该字段进行分组展示
                mbl: element.mbl//是否为最优线，带线玩法可用该字段进行排序，从小到大
            })
        })
    })
    return total;
}

export const dealType = (mg, key) => {
    let total = [];
    if (mg && mg.length > 0) {
        mg.forEach(element => {
            if (element.tps.includes(key)) {
                total.push(element)
            }
        })
    }
    return total;
}

//记录选过的数据
const recordData = (mg: Array<resultMgType>) => {
    useMatchDetailStore.setState({
        recordMg: mg
    })
}

export const setListTopOrBottom = (mg: Array<resultMgType>, idx: number) => {
    mg.forEach((element, index) => {
        if (idx === index) {
            if (!element.flag) {
                element.flag = true;
                mg.splice(idx, 1);
                mg.unshift(element);
            } else {
                element.flag = false;
                mg.splice(idx, 1);
                mg.push(element);
            }
        }
    })
    recordData(mg)
    return mg;
}

const fetchMarchDetail = async (param) => {
    let result: any = await getMatchDetail(param);
    if (result?.code === 0 && result.data?.mg) {
        saveEveryDetailData(result);
    }
    return []
}

let record = new PreviousValueArray<number>(0);
export const checkoutRecord = (param) => {
    record.update(param.matchId);
    let value = record.getValues();
    if (value[0] !== value[1]) {
        useMatchDetailStore.setState({
            recordMg: []
        })
    }
}

export const getListData = async (params) => {
    fetchMarchDetail(params)
}


const handleResultData = (value: MatchDetail) => {
    if (value) {
        let { recordMg } = useMatchDetailStore.getState()
        if (recordMg.length > 0) {
            recordMg.forEach(ele => {
                value.data.mg.forEach((eleItem, index) => {
                    if (ele.nm === eleItem.nm && ele.flag) {
                        eleItem.flag = ele.flag;
                        value.data.mg.splice(index, 1);
                        value.data.mg.unshift(eleItem)
                    }
                })
            })
        }

    }
    return {
        success: value.success,
        data: value.data,
        code: value.code
    }
}

export const saveEveryDetailData = (value) => {
    let result: MatchDetail = handleResultData(value)
    if (result.data) {
        useMatchDetailStore.setState(state => ({
            ...result.data,
            total: result.data.mg
        }))
    } else {
        useMatchDetailStore.setState(state => ({
            // ...result.data,
            total: []
        }))
    }
}

export const checkTheMarchIsProgress = (mc: { s: number, pe: number, r: boolean, tp: number }) => {
    const fbLanguageFile: fbLangue = JSON.parse(window.localStorage.getItem('FB_LANGUAGE_FILE'));
    if (mc) {
        if (fbLanguageFile.matchPeriod) {
            return fbLanguageFile['matchPeriod'][mc.pe]
        }
    } else {
        return fbLanguageFile['matchPeriod']['13001']
    }

}

export const handleShowTitle = (item: resultMgType) => item.mty === 1000 ? true : false;

//处理tabs
export const handleTab = (mg: Array<resultMgType>) => {
    let language = localStorage.getItem('locale');
    let distinguishTps: Array<string> = [];
    let all = language == 'CMN' ? '全部' : 'tất cả'
    if (mg && mg.length === 0) {
        return [];
    }
    mg.forEach(element => {
        distinguishTps = distinguishTps.concat(element.tps)
    })
    let totalTabs = [...new Set(distinguishTps)]
    totalTabs.unshift(all);
    return totalTabs;
}

export const translate = (value: string) => {
    let language = localStorage.getItem('locale');
    let tabs;
    if (language == 'CMN') {
        tabs = {
            p: '热门', h: '让球&大小',
            s: '进球', f: '半场', c: '角球',
            i: '特殊投注', cs: '波胆', b: '罚牌',
            o: '其它', q: '节', t: '15分钟',
            j: '赛局', set: '赛盘', qu: '前二组合',
            z: '准确前二', ps: '点球大战', pro: '晋级球队',
            '1st': '赢得冠军', '3rd': '赢得季军'
        }
        if (value === '全部') {
            return value;
        }

    }
    if (language === 'VIE') {
        tabs = {
            p: 'phổ biến', h: 'Cược chấp & Tài xỉu ',
            s: 'mục tiêu', f: 'nửa thời gian', c: 'phạt góc',
            i: 'cá cược đặc biệt', cs: ' Tỷ số chính xác', b: 'Thẻ phạt',
            o: 'Khác', q: '节', t: '15 phút',
            j: 'Khung thành', set: 'Tình huống', qu: 'hai sự kết hợp đầu tiên',
            z: 'Việt vị ', ps: 'Sút luân lưu', pro: 'Đội hạng 3',
            '1st': 'Đội vô địch', '3rd': 'giành vị trí thứ ba'
        }
        if (value === 'tất cả') {
            return value;
        }
    }
    if (!tabs) return
    return tabs[value];
}

export const handleTimeShip = (sessions: string) => {
    let matchPeriod: fbLangue = JSON.parse(window.localStorage.getItem('FB_LANGUAGE_FILE'));
    return matchPeriod[sessions]
}

export const processTimeShip = (sec) => {
    let minutes = Math.floor(sec / 60);
    let seconds = sec % 60;
    return { minutes, seconds };
}

export const setScore = (item) => common(item, 5)

export const setTriangle = (item) => common(item, 6)

const common = (item, type: number) => {
    let score
    let pe = item.mg[0]?.pe;
    let { nsg } = item;
    if (nsg) {
        for (let i = 0; i < nsg.length; i++) {
            if (nsg[i].pe === pe && nsg[i].tyg === type) {
                score = `${nsg[i].sc[0]}-${nsg[i].sc[1]}`
            }
        }
    }
    return score;
}

export const setCircle = (item) => {
    let score
    item.nsg.forEach(element => {
        if (element.pe === 1002) {
            score = `${element.sc[0]}-${element.sc[1]}`
        }
    })
    return score;
}

export const handleScore = (nsg, pe, tyg) => {
    let score: string[] = [];
    if (nsg && nsg.length) {
        nsg.forEach(element => {
            if (element.pe === pe && element.tyg === tyg) {
                score = element.sc;
            }
        })
        return score;
    }
}

export const choosePopular = (mg: Array<resultMgType>) => {
    let total = [];
    mg.forEach(element => {
        if (element.tps.includes(MarketTagEnum.Popular)) {
            total.push(element)
        }
    })
    return total;
}


export const handleDouble = (array: Array<any>) => {
    let total = [];
    array.forEach(element => {
        console.log(element, 'elment##')
        total.push({ ...element });
    })
    return total;
}


const handleObject = (opElement, element) => {
    return {
        ...opElement,
        au: element.au,//是否支持串关，0 不可串关，1 可串关
        id: element.id,//玩法Id
        li: element.li,//line值，带线玩法的线，例如大小球2.5线，部分玩法展示可用该字段进行分组展示
        mbl: element.mbl,//是否为最优线，带线玩法可用该字段进行排序，从小到大
        ss: element.ss
    }
}
export const master = [
    1, 110, 120, 121,
    130, 131, 132, 23, 24,
    17, 18, 41, 35, 36
];//主
export const draw = [
    3, 222, 244, 277, 122, 100,
    133, 27, 28, 21, 22, 111,
    38, 43, 39]//和
export const vist = [
    2, 101, 102, 103,
    104, 105, 106, 107,
    108, 109, 112, 113,
    114, 115, 116, 117,
    118, 119, 123, 124,
    125, 126, 127, 128,
    129, 134, 135, 136,
    137, 138, 139, 25,
    26, 19, 20, 42,
    37, 40
];//客
export const handleTriple = (array: Array<any>) => {
    let masters = [];
    let drawT = [];
    let vists = [];
    array.forEach((element: resultMgMksType) => {
        element.op.forEach((opElement => {
            if (master.includes(opElement.ty)) {
                masters.push(handleObject(opElement, element));
            }
            if (draw.includes(opElement.ty)) {
                drawT.push(handleObject(opElement, element));
            }
            if (vist.includes(opElement.ty)) {
                vists.push(handleObject(opElement, element))
            }
        }))
    })
    useMatchDetailStore.setState({
        totalMaster: masters,
        drawTotal: drawT,
        vistTotal: vists
    })
}

export const getListInfo = async (params) => {
    try {
        let rs = await getList(params);
        if (rs && rs.data.records.length > 0) {
            return rs.data.records
        }
    } catch (error) {
        return []
    }
}

export const getSportUnionData = async ({ ts, language }) => {
    // let list = await sportUnionData({ ts: new Date().getTime(), language: 'zh_CN' });
}
/**
 * 
 * @param param0 
 */
export const getWeatherInfo = async ({ id, plat }) => {
    let param = {
        id,
        plat,
        t: new Date().getTime()
    }
    let { data }: weatherInfoType = await fetchWeatherInfo(param);
    if (data && data.environment) {
        useHistoryStore.setState({
            weatherInforMation: {
                ...data.environment
            }
        })
    }
}

const fetchTextLive = async ({ queryKey }) => {
    let result: TextLiveType = await fetchTextLiveInfo(queryKey[1])
    if (result && result.data) {
        if (result.data.length > 0) {
            useHistoryStore.setState({
                textLiveList: result.data
            })
        }
        return []
    }
}

//获取文字列表
export const getTextLive = ({ id, plat }) => {
    let argument = { id, plat, t: new Date().getTime() }
    useQuery(['query', argument], fetchTextLive, { refetchInterval: 10000 })
}

//处理数据Tabs的
export const handlerTabs = (fmt: number) => {
    let res = match_format.filter((element: { label: string, value: Array<any> }) => element.value.includes(fmt))
    switch (res[0].label) {
        case BallGamesEnum.FOOT_BALL:
            return matchFormatFooterBall;
        case BallGamesEnum.BASKETBALL:
            return basketball;
    }
}

export const checkoutSessionStatus = (bt) => dayjs(bt).format('MM-DD HH:mm')



//检查赔率
export const checkoutOdds = (currentValue): { previous: any, current: any } => {
    if (currentValue === -999) {
        useHistoryStore.setState({ disable: false });
        return { previous: undefined, current: undefined };
    }
    let record = new RecordValue();
    return record.recordCurrentValue(currentValue);
}


export const showMarchTime = (mc, bt: number, fmt: number, step: number) => {
    if (mc && mc.s) {
        let { matchPeriod }: fbLangue = JSON.parse(window.localStorage.getItem('FB_LANGUAGE_FILE'));
        let { minutes, seconds } = processTimeShip(mc.s + step)
        return `${matchPeriod[mc.pe]}  ${minutes}:${seconds}`
    } else {
        return checkoutSessionStatus(bt)
    }
}


export const fetchBatchBetMatchMarketOfJumpLine = async ({ queryKey }) => {
    try {
        let data = await queryTheOddOfBetting(queryKey[1]);
        return data
    } catch (error) {

    }
    // return []
}


export const refreshMg = (item) => {
    useMatchDetailStore.setState({ mg: item.mg })
}
