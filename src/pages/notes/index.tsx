import React, { useEffect, useState, useRef, useMemo } from 'react';
import listen from '@/assets/images/sports/svg/listenMusic.svg'
import './notes.scss';
import './component/sports/sports.scss'
import Sports from './component/sports';
import Game from './component/game';
import Customer from '@/components/customer';
import { DownOutline } from 'antd-mobile-icons';
import { Input, Button, Toast, Dropdown, Mask, } from 'antd-mobile'
import { useNotesStore } from '@/stores/notes';
import { calculate, calculateAdd, calculateSettle, calculateStake, cancelOrder, earlySettlement, fetchGameBetByChannel, form, getPassSevenDate, getYesTodayDate, handleBetAmount, handleMinAndMax, rebate, remainingPrincipal, setMin } from '@/hooks/useNotes';
import EventAnnouncements from './component/eventNotify';
import eventBus from '@/utils/events';
import Reserve from './component/reserve';
enum TabsTitle {
    TODAY = 'today',
    YESTERDAY = 'yesterday',
    SEVEN = 'seven'
}

let countPage: number = 1;
const Nodes: React.FC = () => {
    let { timesShip, active } = useNotesStore.getState();
    let params = {
        data: {
            isSettled: false,//是否结算 未结算
            currencyId: 1000,//币种
            startTime: timesShip.startTime,//开始时间
            endTime: timesShip.endTime,//结束时间
            languageType: "CMN"
        },
        current: countPage,
        size: 50
    }

    const [visible, setVisible] = useState(false)
    const [isChoose, setIsChoose] = useState('sports');
    let [item, setItem] = useState<any>({})
    const [isShowSettlement, setIsShowSettlement] = useState(false);
    const checkStatus = (title: string) => {
        setIsChoose(title)
    }
    const inputRef = useRef(null);
    const [conformSettlement, setConformSettlement] = useState(false)
    let [currentSettle, setCurrentSettle] = useState(0)
    const [minValue, setMinValue] = useState<number>(0);
    const [maxValue, setMaxValue] = useState<number>(0);
    const [actives, setActive] = useState('unSettle');
    const [isSettle, setIsSettle] = useState(false)
    const [tabs, setTabs] = useState('today');
    const [title, setTitle] = useState('今日');
    const [value, setValue] = useState(0);
    const [values, setValues] = useState('');
    const [isActiveKey, setIsActiveKey] = useState('');
    const orderUnSettleNumber = useNotesStore(state => state.orderUnSettleNumber);
    const orderNumber = useNotesStore(state => state.orderNumber)
    const [flag, setFlag] = useState(false);
    const setTime = (startTime, endTime) => {
        useNotesStore.setState({
            timesShip: {
                startTime: startTime,
                endTime: endTime
            }
        })
    }

    const getGameBetByChannel = async () => {
        await fetchGameBetByChannel(params, 'settle');
    }
    const checkoutStatus = (title: string) => {
        switch (title) {
            case TabsTitle.TODAY:
                setTime(timesShip.startTime, timesShip.endTime);
                getGameBetByChannel();
                setStateCommon('今日', orderNumber, 'today', false);
                break;
            case TabsTitle.YESTERDAY:
                let { startTime: start, endTime: end } = getYesTodayDate();
                setTime(start, end);
                getGameBetByChannel();
                setStateCommon('昨日', orderNumber, 'yesterday', false);
                break;
            case TabsTitle.SEVEN:
                let { startTime, endTime } = getPassSevenDate();
                setTime(startTime, endTime);
                getGameBetByChannel();
                setStateCommon('7天内', orderNumber, 'seven', false);
                break;
        }

    }

    const handlerActive = (title) => {
        useNotesStore.setState({
            active: title
        })
        setActive(title)
    }

    const change = values => {
        if (values > maxValue) {
            Toast.show({
                content: '输入金额超出最大限额'
            });
            return
        }
        let settleValue = values * item.amt;
        setCurrentSettle(Number(parseFloat(`${settleValue}`).toFixed(2)))
        setValues(values)
    };

    const setStateCommon = (title: string, value: number, tabs: string, flag: boolean) => {
        setTitle(title);
        setValue(value);
        setTabs(tabs);
        setIsActiveKey('');
        setFlag(flag);
    }

    const handleStatus = () => {
        setFlag(!flag);
        let title = !flag ? 'sorter' : '';
        setIsActiveKey(title)
    }

    const handleCanalOrder = (item) => {
        setIsShowSettlement(false)
    }
    const renderTitleValue = () => {
        return <div onClick={() => handleStatus()}>
            <span>{`${title}${value}`}</span>
        </div>
    }

    const handleAction = () => {
        earlySettlement(item, values, item.amt);
        setConformSettlement(false)
    }

    const handleSettle = () => {
        if (minValue - Number(values) > 0) {
            Toast.show({
                content: '输入金额小于最小限额',
                position: 'top'
            })
            return
        }
        if (maxValue - Number(values) < 0) {
            Toast.show({
                content: '输入金额大于最大限额',
                position: 'top'
            })
            return
        }
        setConformSettlement(true)
        setIsShowSettlement(false)
    }

    useEffect(() => {
        eventBus.on('isSettleDetail', e => {
            setIsSettle(e.flag)
            setItem(e);
        })
    }, [isSettle])
    useEffect(() => {
        eventBus.on('close', e => {
            setVisible(e.flag);
            setItem(e)
        })
        eventBus.on('isPreSettle', e => {
            setIsShowSettlement(e.flag);
            setItem(e);
            setValues(handleBetAmount(calculateStake(e.betAmount, e), item.cashOutAmount))
        })

    }, [visible, isShowSettlement])

    const currentSettles = () => {
        let value = Number(form(calculateSettle(handleBetAmount(item.betAmount, item.cashOutAmount), item.amt)));
        setCurrentSettle(value)
    }

    useEffect(() => {
        currentSettles();
    }, [item.betAmount, item.cashOutAmount])
    useEffect(() => {
        setMinValue(setMin(item.seriesType, item.smis, item.pmis));
        setMaxValue(handleBetAmount(item.betAmount, item.cashOutAmount))//设置最大限额
    }, [item.betAmount, item.oddsValue])

    return <div className='notes'>
        <div className='top' >
            <div className='nav-bar-title'>
                <div className={isChoose === 'sports' ? 'title-left' : 'title-left-normal'}>
                </div>
                <div className={isChoose === 'sports' ? 'active' : 'inactive_sports'} onClick={() => checkStatus('sports')}>
                    <span>
                        BB体育
                    </span>
                </div>
                <div className={isChoose === 'game' ? 'active' : 'inactive'} onClick={() => checkStatus('game')}>
                    <span>游戏</span>
                </div>
                <div className={isChoose === 'game' ? 'listen' : 'inListen'} style={{ paddingRight: '12px' }} >
                    <Customer />
                </div>
            </div>

            {

                isChoose === 'sports' ? (
                    <div className='sport-header'>
                        <div className='box-item' onClick={() => handlerActive('unSettle')}>
                            <span className={actives === 'unSettle' ? 'span-active' : 'span-inactive'}>未结算 {orderUnSettleNumber}</span>
                        </div>
                        <div className='box-item' onClick={() => handlerActive('settle')}>
                            <span className={actives === 'settle' ? 'span-active' : 'span-inactive'}>已结算</span>
                        </div>
                        {
                            active === 'settle' ? (
                                <div className='settle-detail'>
                                    <Dropdown arrow={<DownOutline width={20} height={20} ></DownOutline>} activeKey={isActiveKey} >
                                        <Dropdown.Item key='sorter' title={renderTitleValue()} >
                                            <div className="sorter-date">
                                                <div className={tabs === 'today' ? 'date-active' : 'date-inactive'} onClick={() => checkoutStatus(TabsTitle.TODAY)}>今日</div>
                                                <div className={tabs === 'yesterday' ? 'date-active' : 'date-inactive'} onClick={() => checkoutStatus(TabsTitle.YESTERDAY)} style={{ marginLeft: '12px', marginRight: '12px' }}>昨日</div>
                                                <div className={tabs === 'seven' ? 'date-active' : 'date-inactive'} onClick={() => checkoutStatus(TabsTitle.SEVEN)}>7天内</div>
                                            </div>
                                        </Dropdown.Item>
                                    </Dropdown>
                                </div>
                            ) : null
                        }
                    </div>

                ) : null
            }

        </div>
        <Mask
            visible={visible}
            style={{ zIndex: 9999, }}
            onMaskClick={() => setVisible(false)}
        >
            <Reserve args={item} />
        </Mask>
        <Mask
            visible={isShowSettlement}
            style={{ zIndex: 9999, }}
            onMaskClick={() => setIsShowSettlement(false)}
        >
            <div className='forSettlement' style={{ padding: '12px' }}>
                <div>
                    <div style={{ fontWeight: 'bold', textAlign: 'center' }}>提前结算</div>
                    <div>提前结算部分的投注将立即结算且与该投注相关的最终结果不影响已结算至你的账户中的金额结算</div>
                </div>
                <div style={{ position: 'relative', }}>
                    <span>结算本金</span>
                    <span style={{ position: 'absolute', right: 0 }}>限额:{handleMinAndMax(minValue, maxValue)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div>￥</div>
                    <Input
                        type="number"
                        max={maxValue}
                        defaultValue={`${values}`}
                        onChange={change}
                        value={values}
                        style={{ border: '1px solid blue', height: '45px', width: '100%', marginBottom: '10px' }}
                        ref={inputRef} />

                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button color='primary' fill='outline' onClick={() => handleCanalOrder(item)}>取消</Button>
                    <Button color='primary' style={{ background: 'blue', marginLeft: '12px' }} onClick={handleSettle}>结算{currentSettle}</Button>
                </div>
            </div>
        </Mask>

        {/* 提前结算确认 */}
        <Mask
            visible={conformSettlement}
            style={{ zIndex: 9999, }}
            onMaskClick={() => setIsShowSettlement(false)}
        >
            <div className='forSettlement' style={{ width: '80%', height: '30%' }}>
                <div style={{ padding: '20px' }}>

                    <div style={{ textAlign: 'center', fontWeight: 'bold' }}>提前结算</div>
                    <div>该投注将被立即结算，且与该投注相关的最终结果将不影响返还至你的账户中的金额，返还额已包含本金</div>
                    <div style={{ position: 'relative' }}><span>投注额</span><span style={{ position: 'absolute', right: 0 }}>{values}</span></div>
                    <div style={{ position: 'relative' }}><span>返还额</span><span style={{ position: 'absolute', right: 0 }}>{rebate(values, item.amt)}</span></div>
                </div>


                <div style={{ display: 'flex', width: '100%', height: "38px", borderTop: '1px solid #f0f0f0' }}>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid #f0f0f0' }} onClick={() => setConformSettlement(false)}>取消</div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={handleAction}>确定</div>
                </div>
            </div>
        </Mask>
        {/* 结算详情*/}
        <Mask
            visible={isSettle}
            style={{ zIndex: 9999, }}
            onMaskClick={() => setIsShowSettlement(false)}
        >
            <div className='forSettlement' style={{ width: '80%', }}>
                <div style={{ padding: '20px' }}>
                    <div style={{ textAlign: 'center', fontWeight: 'bold' }}>提前结算详情</div>
                    <div style={{ position: 'relative', width: '100%' }}>投注额<span style={{ position: 'absolute', right: 0, fontWeight: 'bold' }}>{item.betAmount}</span></div>
                    <div style={{ position: 'relative', width: '100%' }}>提前结算本金<span style={{ position: 'absolute', right: 0, fontWeight: 'bold' }}>{item.cashOutAmount}</span></div>
                    <div style={{ position: 'relative', width: '100%' }}>提前结算返还<span style={{ position: 'absolute', right: 0, fontWeight: 'bold' }}>{item.cashOutPayoutAmount}</span></div>
                    <div style={{ position: 'relative', width: '100%' }}>剩余本金<span style={{ position: 'absolute', right: 0, fontWeight: 'bold' }}>{remainingPrincipal(item.betAmount, item.cashOutAmount)}</span></div>
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: "38px",
                    borderTop: '1px solid #f0f0f0',
                    paddingTop: '12px',
                    fontWeight: 'bold',
                    color: 'blue'
                }} onClick={() => setIsSettle(false)}>
                    确定
                </div>
            </div>
        </Mask>
        {
            isChoose === 'sports' ? <Sports /> : <Game />
        }

    </div>
}

export default Nodes