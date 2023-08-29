import React, { useRef, useState } from 'react';
import './settlePanel.scss'
import { Button, Dialog, Divider, Form, Input, Mask, Popup, Toast } from 'antd-mobile';
import { useNotesStore } from '@/stores/notes';
import eventBus from '@/utils/events';
import { useEffect } from 'react'
import { WinnableAmount, calculate, calculateAdd, calculateSettle, calculateStake, cancelOrder, earlySettlement, form, formTime, formatMark, formatStatus, handeAdanceSettlement, handleBetAmount, handleSettle, handleSettleDetail, plate } from '@/hooks/useNotes';
type itemProp = {
    item?: any,
    index?: number | string
    isShowButton?: boolean
}
const SettlePanel: React.FC<itemProp> = ({ item, index, isShowButton }: itemProp) => {
    let [visible, setVisible] = useState(false);
    const [isDialog, setIsDialog] = useState(false);
    let [accounts, setAccounts] = useState(item.betAmount)
    // const [isShowSettlement, setIsShowSettlement] = useState(false);
    const inputRef = useRef(null);
    const [value, setValue] = useState('')
    const reserve = () => {
        let args = Object.assign({ flag: true }, item)
        eventBus.emit('close', args)
        useNotesStore.setState({
            userName: item.userName,
            orderNo: item.orderNo,
            cashOutAmount: item.betAmount,
            cashOutPayoutAmount: calculateAdd(item.betAmount, WinnableAmount(item.betAmount, calculate(item.betAmount, item.oddsValue))),
            seriesType: item.seriesType,
            betAmount: item.betAmount,
            oddsValue: item.oddsValue,
            amt: item.amt,
            isShowButton: handleSettle(item)
        })
    }
    const copyOrder = () => {
        setVisible(false);
        Toast.show({
            content: <div className='tips-order'>单号已复制</div>,
            position: 'top',
            maskClassName: 'tips-mask'
        })
    }

    const handleSettlement = () => {
        let obj = Object.assign(item, { flag: true })
        eventBus.emit('isPreSettle', obj)
    }


    const settlement = () => {
        let obj = Object.assign(item, { flag: true })
        eventBus.emit('isSettleDetail', obj)
    }

    const windableAmount = () => {
        let minValue = handleBetAmount(item.betAmount, item.cashOutPayoutAmount);
        let maxValue = calculate(handleBetAmount(item.betAmount, item.cashOutPayoutAmount), item.oddsValue);
        return parseFloat(`${WinnableAmount(minValue, maxValue)}`).toFixed(2)
    }

    return <div className='order-item-comp' key={index}>
        <div className='order-top'>
            <div className='match-title'>
                <div className='title-icon'>
                    <div className='icon'></div>
                    <div className='match-name' >{item.matchName}</div>
                </div>
                <div className='status'>
                    {formatStatus(item.betStatus)}
                </div>
            </div>
            <div className='sub_info'>
                <div className='sub-left'>{item.tournamentName}</div>
                <div className='sub-right'>
                    开赛： {formTime(item.matchTime)}
                </div>
            </div>
        </div>
        <div className='content'>
            <div className='title'>
                <span>{item.optionName}</span>
                <span style={{ fontWeight: 'bold' }}>@{item.oddsValue}</span>
                {/* <span className='score'>赛果：5-2</span> */}
            </div>
            <div className='bet-market'>
                <div className='left'>
                    <span>{formatMark(item.market)}：</span>
                    <span>{item.marketName}</span>
                    <span>{item.betScore}</span>
                </div>
                <div className='right'></div>
            </div>
            <div className='result-info'>
                <div className='left'>
                    {/* 投注额 */}
                    <div style={{ fontSize: '15px' }}>投注额</div>
                    <div className='amount'>{calculateStake(item.betAmount, item)}</div>
                </div>
                <div className='right'>
                    {/* 可赢额 */}
                    <div style={{ fontSize: '15px' }}>可赢额</div>
                    <div className='amount'>{
                        windableAmount()
                    }</div>
                </div>
            </div>
        </div>
        <div className='order-item-bottom'>
            <div className='order-info'>
                <div>{formTime(item.createTime)}  ({plate(item.oddsType)})</div>
                <div className='order' >
                    <span className='order-text' onClick={() => setVisible(true)}>
                        单号:{item.orderNo}
                    </span>
                    <Popup
                        visible={visible}
                        onMaskClick={() => {
                            setVisible(false)
                        }}
                        onClose={() => {
                            setVisible(false)
                        }}
                        bodyStyle={
                            {
                                height: '30vh',
                                borderTopLeftRadius: '20px',
                                borderTopRightRadius: '20px'
                            }
                        }
                    >
                        <div className='customer'>

                            <div className='custer'>对此订单有疑问，咨询客服</div>
                            <div onClick={copyOrder}>复制单号</div>
                            <div className='cancel' onClick={() => setVisible(false)}>取消</div>
                        </div>
                    </Popup>
                </div>
            </div>
            <div className='bottom-content'>
                <div className='btn'>
                    {
                        item.amt ? (
                            <div className='btn-detail'>
                                <div className='btn-content'>
                                    <div onClick={handleSettlement}>
                                        提前结款 :{handeAdanceSettlement(item)}
                                    </div>
                                    <div className='right-reserve' onClick={reserve}>
                                        <Divider direction='vertical' />
                                        {handleSettle(item) ? '已预约' : '预约'}
                                    </div>
                                </div>

                            </div>
                        ) : null
                    }
                </div>

                {
                    isShowButton ? (
                        <>
                            {
                                handleSettleDetail(item) ? <div className='settle-detail' onClick={() => settlement()}>结算详情</div> : null
                            }
                        </>
                    ) : null
                }
            </div>
        </div>

    </div>
}

export default SettlePanel