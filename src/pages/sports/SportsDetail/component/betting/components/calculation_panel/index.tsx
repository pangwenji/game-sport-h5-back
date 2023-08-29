import { Button, Ellipsis, Form, Input, Mask, Modal, Toast } from "antd-mobile"
import React, { PropsWithChildren, useState, useEffect } from "react";
import './calculation_panel.scss';
import backLeftArrow from '@/assets/images/sports/svg/back-left-arrow.svg';
import circularArch from '@/assets/images/sports/svg/circular-arch.svg';
import { changesShowKeyboardStatus, useCalculation, useMatchDetailStore } from "@/stores/sports-detail";

import {
    useIsSelectSeriesStore,

    //单关
    useBetSinglePassOptionStore,
    updatedBetSinglePassOptionStatus,
    useBetSinglePassMarketListStore,

    //串关
    useBetOptionListStore,
    updatedBetOptionListStatus,
    useBetMatchMarketListStore,

    usebatchBetMatchMarketOfJumpLineDataStateStore,
} from "@/stores/bet";


import { resultMgMksOPType, resultMgMksType } from "@/interface";
import { useLocation } from 'react-router-dom'
import SpanRight from "../render_span_right";
import { fetchBatchBetMatchMarketOfJumpLine } from "@/hooks/useBettings";
import { useQuery } from "@tanstack/react-query";
import { getBetMultiple, getBetSinglePass } from '@/api/bet';
import eventBus from "@/utils/events";
import { Console } from "console";
import { number } from "echarts";

interface IProp {
    // visible: boolean,
    children?: any,
    onCloseClick?: () => void,
    ele?: resultMgMksType,
    nm: string,
    od: number,
    ty?: number,
    takePlay?: string
    id?: number,
    ss?: number,
    au?: number,
    isShowBackground?: boolean
}
let digital: string = '';
const CalculationPanel: React.FC<PropsWithChildren<IProp>> = ({ id, ss, od, nm, ty, isShowBackground, takePlay }: IProp) => {
    const [turn, setTurn] = useState(false);
    const [isShow, setIsShow] = useState(false);
    // const location = useLocation();
    // location.state?.id
    const [value, setValue] = useState<string>('');
    const [sos, setSos] = useState<any>([]);
    const [bms, setBms] = useState<any>([]);
    // const [canWin, setCanWin] = useState<string>('');

    let { isShowKeyboard } = useCalculation.getState();

    let { betSinglePassOption } = useBetSinglePassOptionStore.getState()
    let { betSinglePassMarketList } = useBetSinglePassMarketListStore.getState()
    let { betOptionList } = useBetOptionListStore.getState()
    let { betMatchMarketList } = useBetMatchMarketListStore.getState()

    let { batchBetMatchMarketOfJumpLineData: object } = usebatchBetMatchMarketOfJumpLineDataStateStore.getState()
    let { isSelectSeries } = useIsSelectSeriesStore.getState()

    let { Marchid, nm: teamName, lg, mg } = useMatchDetailStore.getState()

    let {
        type: sportType,//类型
        sportId
    } = useMatchDetailStore.getState()

    const [type, setType] = useState(0)

    const changeValue = (value: string) => {
        digital += value
        let digitalArray = digital.split('.')
        if (digitalArray.length === 1) {
            setValue(digitalArray.join(''));
        } else if (digitalArray.length >= 2) {
            if (digitalArray[0] === '') return
            if (digitalArray[0] === '' && digitalArray[1] === '') return
            let firstValue = digitalArray[0];
            let secondValue = digitalArray[1].slice(0, 2);
            let value = firstValue + '.' + secondValue;
            setValue(value)
        }
    };
    const calculation = (data: number) => {
        // let total = Number(value) + data;
        let total = data;
        setValue(String(total))
    }
    const calculationMax = () => {
        let total = 3000;
        setValue(String(total))
    }
    const calculationDel = () => {
        let total = value.slice(0, -1);
        setValue(String(total))
    }

    const closeClick = () => {
        digital = '';
        setValue('')
        setIsShow(false)
    }

    const handleClick = () => {
        if (od !== -999 && ss !== 0) {
            setIsShow(true)
        }
    }
    const handleShowKeyboard = () => {
        changesShowKeyboardStatus(true);
    }

    const calculationCanWin = (od: any) => {
        return (Number(value) * (Number(od) - 1)).toFixed(2);
    }

    const calculationSeriesCanWin = (sos: any) => {
        let snSum:number = 0;
        let soddSun:number = 0;
        sos?.map((item, idx) => {
            soddSun += Number(item.sodd)
            if (item?.sn == 0) {
                snSum += (idx + 1)
            } else {
                snSum += Number(item.sn)
            }
        })
        return (soddSun * Number(value) - (snSum * Number(value))).toFixed(2);
    }

    const amount = (sos: any) => {
        let snSum:number = 0;
        sos?.map((item, idx) => {
            if (item?.sn == 0) {
                snSum += (idx + 1)
            } else {
                snSum += Number(item.sn)
            }
        })
        return (snSum * Number(value)).toFixed(2);
    }


    const betOptionListArr = betOptionList;
    const betMatchMarketListArr = betMatchMarketList;
    let paramsBetSinglePass = {
        singleBetList: [
            {
                unitStake: value || 100,
                oddsChange: 1,
                betOptionList: (betOptionList.length > 0) ? betOptionList : [
                    { marketId: id, matchId: Marchid, odds: od, optionType: ty, oddsFormat: 1 }
                ],
            }
        ],
        market: sportType, //'玩法归类：0滚球,1今日,2早盘,3冠军
        sportId: sportId, //育项目 ID,例如：足球、篮球、电竞等ID'
        currencyId: 1000,
        languageType: "CMN",
        userName: localStorage.getItem('userName'),
        channelType: 1
    }
    const handleBetSinglePass = () => {
        updateBetMatchMarketList([
            { marketId: id, matchId: Marchid || 1563379, type: ty }
        ]);
        getBetSinglePass(paramsBetSinglePass).then((res: any) => {
            Toast.show({
                content: res?.msg,
            })
            if (res?.code === 0) {
                console.log("getBetSinglePass 投注成功，关闭当前对话框 ")
            }
        })
    }

    let paramsBetMultiple = {
        betMultipleData: [
            // { itemCount: 1, oddsChange: 1, seriesValue: 2, unitStake: value || 100 }
        ],
        betOptionList: betOptionList,
        market: sportType, //'玩法归类：0滚球,1今日,2早盘,3冠军
        sportId: sportId, //体育项目ID ,例如：足球、篮球、电竞等ID'
        currencyId: 1000,//币种
        languageType: "CMN",
        userName: localStorage.getItem('userName'),
        channelType: 1
    }

    const handleBetMultiple = () => {
        getBetMultiple(paramsBetMultiple).then((res: any) => {
            Toast.show({
                content: res?.msg,
            })
            if (res?.code === 0) {
                handleClearMultiple();
                console.log("getBetMultiple 投注成功，关闭当前对话框 ")
            }
        })
    }

    const updateIsSelectSeriesState = useIsSelectSeriesStore((state) => state.updateIsSelectSeriesState);
    const updateBetSinglePassMarketList = useBetSinglePassMarketListStore((state) => state.updateBetSinglePassMarketList);
    const updateBetMatchMarketList = useBetMatchMarketListStore((state) => state.updateBetMatchMarketList);
    // const updatebatchBetMatchMarketOfJumpLineData = usebatchBetMatchMarketOfJumpLineDataStateStore((state) => state.updatebatchBetMatchMarketOfJumpLineData);


    const handleAddBetSinglePass = () => {
        // updateIsSelectSeriesState(false);
        updatedBetSinglePassOptionStatus([{ marketId: id, matchId: Marchid, odds: od, optionType: ty, oddsFormat: 1 }]);
        updateBetSinglePassMarketList([{ marketId: id, matchId: Marchid || 1563379, type: ty }]);
        console.log("==BetSinglePas==", betSinglePassOption)
        console.log("==BetSinglePassMarketList==", betSinglePassMarketList)
    }
    useEffect(() => {
        handleAddBetSinglePass()
    }, [isShow])

    const handleAddMultiple = () => {
        setIsShow(false)
        updateIsSelectSeriesState(true);
        betOptionListArr.push({ marketId: id, matchId: Marchid, odds: od, optionType: ty, oddsFormat: 1 })
        updatedBetOptionListStatus(betOptionListArr);

        console.log("==handleAddMultiple==", { marketId: id, matchId: Marchid || 1563379, type: ty })

        betMatchMarketListArr.push({ marketId: id, matchId: Marchid || 1563379, type: ty })
        updateBetMatchMarketList(betMatchMarketListArr);
        console.log("==betOptionList==", betOptionList)
        console.log("==betMatchMarketList==", betMatchMarketList)
    }

    const handleClearMultiple = () => {
        setIsShow(false)
        updateIsSelectSeriesState(false);
        updatedBetOptionListStatus([]);
        updateBetMatchMarketList([]);
    }

    // confirmRemove
    const handleDelMultiple = (idx: number) => {
        const updatedData = betMatchMarketList.filter((item: any, index: any) => {
            return idx !== index;
        });
        updateBetMatchMarketList(updatedData);
    }
    const handAU = (item) => {
        if (item.au == 0) {
            return '不可串关';
        } else if (item.ss == 0) {
            return '盘口关闭';
        } else if (item.ss == -1) {
            return '未开售';
        }
        return ''
    }

    const handSS = (item: any) => {
        if (item.ss == 0) {
            return '盘口关闭';
        } else if (item.ss == -1) {
            return '未开售';
        }
        return ''
    }



    let params = {
        betMatchMarketList: (isSelectSeries && betMatchMarketList.length > 1) ? betMatchMarketListArr : betSinglePassMarketList,
        userName: localStorage.getItem('userName'),
        channelType: 1,
        currencyId: 1000,//币种
        languageType: "CMN",
        market: sportType, //'玩法归类：滚球,今日,早盘,冠军
        sportId: sportId, //体育项目ID ,例如：足球、篮球、电竞等ID'
        // isSelectSeries: true
        isSelectSeries: (isSelectSeries && betMatchMarketList.length > 1) ? true : false // 是否串关
        // isSelectSeries: au === 1 ? true : false // 是否支持串关，0 不可串关，1 可串关
    }
    // let { data, error, isLoading } = useQuery(['query', params], fetchBatchBetMatchMarketOfJumpLine)// { refetchInterval: 10000 })
    let { data, error, isLoading } = useQuery(['query', params], fetchBatchBetMatchMarketOfJumpLine, { refetchInterval: 3000 })
    useEffect(() => {
        if (!isLoading && !error) {
            // updatebatchBetMatchMarketOfJumpLineData(data.data?.bms);
            setBms(data.data?.bms)
            if (isSelectSeries) {
                setSos(data.data?.sos)
            }

            console.log("==useEffect betMatchMarketList===", betMatchMarketList)


        }
    }, [isShow])
    return (
        <div className="calculation"  >
            <div className="collapse_box" onClick={handleClick} style={{ background: isShowBackground ? 'rgba(0, 0, 0, 0)' : '#f0f0f0' }}>
                <span className="span-left">{nm}</span>
                <Input disabled className="input" />
                <SpanRight value={od} ss={ss} />
            </div>
            <Mask visible={isShow}
                onMaskClick={() => closeClick()}
            >
                <div className="mark-main">
                    <div className="mark-main-header">
                        <div className="left">BB投注</div>
                        <div className="right">
                            <div className="right-content">
                                <span>0</span>

                                <div className="circularArch" onClick={() => setTurn(!turn)}>
                                    <img src={circularArch} width={16} height={16} className={turn ? 'turn' : ''} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mark-main-content">
                        <div className="mark-display">
                            {
                                bms?.map((item: any, idx: number) => {
                                    return (
                                        <div key={idx}>
                                            <div className="mark-display-up">
                                                <div className="mark-display-up-top">
                                                    <span className="left">
                                                        {takePlay}
                                                    </span>
                                                    <span className="right">@{item?.op?.od}</span>
                                                </div>
                                                <div className="mark-display-up-middle">
                                                    <span>
                                                        {lg.na}
                                                    </span>
                                                    <span style={{ textAlign: 'end', color: '#2B44B1' }}>{item?.op?.nm}</span>
                                                </div>
                                                <div className="mark-display-up-bottom">
                                                    <span >
                                                        {teamName}
                                                    </span>
                                                    <div>
                                                        <div className="box">
                                                            {/* 单关  */}
                                                            { !isSelectSeries && handSS(item) ? (<div className="handicap">{handSS(item)}</div>) : null }

                                                            {/* 单关不显示  */}
                                                            { isSelectSeries && handAU(item) ? (<div className="handicap">{handAU(item)}</div>) : null }
                                                            <div onClick={() => handleDelMultiple(idx)} className="delete">删除</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                (bms?.length === 1) ?
                                                    <div onClick={() => handleShowKeyboard()} className="mark-display-down">
                                                        <div className="input-content">
                                                            <div style={{ flex: 0.2 }}>￥</div>
                                                            <Input className="input-down" value={value} />
                                                            <Ellipsis direction='end' content={`限额${item?.smin}~${item?.smax}`} />
                                                        </div>
                                                    </div>
                                                    : null
                                            }
                                        </div>
                                    )
                                })
                            }
                            {
                                sos && isSelectSeries && (bms?.length > 1) ? (
                                    sos?.map((item: any, idx: number) => {
                                        return (
                                            <div key={idx} onClick={() => handleShowKeyboard()} className="mark-display-down">
                                                <div className="input-content">
                                                    {item?.sn !== 0 ? <div>{item?.sn}串1*{item?.in} @{item?.sodd}</div> : null}
                                                    {item?.sn === 0 ? <div>{idx + 1}串{item?.in}*{item?.in} @{item?.sodd}</div> : null}
                                                    <div style={{ flex: 0.2 }}> ￥</div>
                                                    <Input className="input-down" value={value} />
                                                    <Ellipsis direction='end' content={`限额${item?.mi}~${item?.mx}`} />
                                                </div>
                                            </div>
                                        )
                                    })
                                ) : null
                            }
                            {
                                !sos && isSelectSeries && (bms?.length > 1) ? (
                                    <div className="mark-display-down">
                                        <div className="input-content">
                                            <div style={{ flex: 0.2 }}> ￥</div>
                                            <Input className="input-down" />
                                            <Ellipsis direction='end' content={`限额0~0`} />
                                        </div>
                                    </div>
                                ) : null
                            }
                        </div>
                        <div className="mark-keyboard">
                            {
                                isShowKeyboard ? (

                                    <div className="mark-keyboard-top">
                                        <div className="mark-keyboard-top-left">
                                            <div className="numberKeys">
                                                <div onClick={() => changeValue('1')}>1</div>
                                                <div onClick={() => changeValue('4')}>4</div>
                                                <div onClick={() => changeValue('7')}>7</div>
                                                <div onClick={() => changeValue('.')}> .</div>
                                            </div>
                                            <div className="numberKeys">
                                                <div onClick={() => changeValue('2')}>2</div>
                                                <div onClick={() => changeValue('5')}>5</div>
                                                <div onClick={() => changeValue('8')}>8</div>
                                                <div onClick={() => changeValue('0')}>0</div>
                                            </div>
                                            <div className="numberKeys">
                                                <div onClick={() => changeValue('3')}>3</div>
                                                <div onClick={() => changeValue('6')}>6</div>
                                                <div onClick={() => changeValue('9')}>9</div>
                                                <div onClick={() => calculationDel()} >
                                                    <img src={backLeftArrow} width={20} height={20} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mark-keyboard-top-right">
                                            <div onClick={() => calculation(100)}>100</div>
                                            <div onClick={() => calculation(200)}>200</div>
                                            <div onClick={() => calculation(500)}>500</div>
                                            <div onClick={() => calculationMax()} className="max">MAX</div>
                                        </div>
                                    </div>
                                ) : <div ></div>
                            }

                            <div className="mark-keyboard-bottom">
                                <Button onClick={() => handleAddMultiple()} block shape='rounded' color='primary' className="btn-left">
                                +串
                                </Button>

                                {
                                    !isSelectSeries ? (
                                        <Button onClick={() => handleAddMultiple()} block shape='rounded' color='primary' className="btn-left">
                                            +串
                                        </Button>
                                    ) : (
                                        <Button onClick={() => handleClearMultiple()} block shape='rounded' color='primary' className="btn-left">
                                            清除
                                        </Button>
                                    )
                                }
                                <Button onClick={() => isSelectSeries && (betMatchMarketList.length > 1) ? handleBetMultiple() : handleBetSinglePass()} block shape='rounded' className={`btn-right ${value ? 'active' : ''}`}>
                                    投注
                                    {/* {betOptionList.length}-{betMatchMarketList.length}  */}

                                    {/* 单关可赢 */}
                                    {!isSelectSeries && value && bms[0]?.op?.od ?
                                        <div style={{ color: '#bbb', fontSize: '12px', fontWeight: 400 }}>
                                            可赢：{calculationCanWin(bms[0]?.op?.od)}
                                        </div>
                                    : null}
                                    {/* 串关可赢 */}
                                    {isSelectSeries && sos ? 
                                        <div style={{ color: '#bbb', fontSize: '12px', fontWeight: 400 }}>
                                            总本金：{amount(sos)}
                                            可赢：{calculationSeriesCanWin(sos)}
                                        </div>
                                    : null}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

            </Mask>

        </div>
    )
}

export default CalculationPanel