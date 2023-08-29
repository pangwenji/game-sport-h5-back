import React, { useEffect, useState, useRef } from 'react';
import './reserve.scss'
import { Button, Dialog, Form, Input, Mask } from 'antd-mobile';
import { WinnableAmount, appointCancellation, bookSettlement, calculate, calculateAdd, handleBetAmount, setMin } from '@/hooks/useNotes';
import eventBus from '@/utils/events';
import { useNotesStore } from '@/stores/notes';
type IProp = {
    args?: any
}
const Reserve: React.FC<IProp> = ({ args }: IProp) => {
    let {
        cashOutPayoutAmount,
        betAmount,
        amt,
        oddsValue,
        seriesType,
        isShowButton,
    } = useNotesStore.getState();
    const eaCheckoutRef = useRef(null);
    const settlementRef = useRef(null)
    let [eaCheckout, setEaCheckout] = useState('');
    let [settlementReturn, setSettlementReturn] = useState(null);

    const cancel = () => {
        eventBus.emit('close', { flag: false })
    }


    const handleEaCheckoutChange = value => setEaCheckout(value);

    const handleSettlementReturnChange = value => setSettlementReturn(value);


    const handleAction = () => bookSettlement(eaCheckout, settlementReturn);

    const preSettlement = () => {



        eventBus.emit('close', { flag: false })
        Dialog.show({
            content: <div style={{ height: '45%' }}>
                <div>预约提前结算</div>
                <div>当达到你设定的结算本金和可赢额时，系统自动结算</div>
                <div style={{ position: 'relative' }}><span>结算本金</span><span style={{ position: 'absolute', right: 0 }}>{eaCheckout}</span></div>
                <div style={{ position: 'relative' }}><span>结算返还额</span><span style={{ position: 'absolute', right: 0 }}>{settlementReturn}</span></div>
            </div>,
            closeOnAction: true,
            onAction: handleAction,
            actions: [
                [
                    {
                        key: 'cancel',
                        text: '取消预约',
                    },
                    {
                        key: 'delete',
                        text: '确定预约',
                        bold: true,
                    },
                ],
            ],
        })
    }

    const setAutoClearBalance = () => {
        let minAmount = handleBetAmount(betAmount, args.cashOutAmount);
        let maxAmount = calculate(handleBetAmount(betAmount, args.cashOutAmount), oddsValue)
        let final = parseFloat(`${WinnableAmount(minAmount, maxAmount)}`).toFixed(2)
        return final
    }
    useEffect(() => {
        setEaCheckout(`${args.betAmount}`);
        let value = parseFloat(`${args.betAmount * args.amt}`).toFixed(2)
        setSettlementReturn(value);
    }, [args.cashOutAmount])
    return <div className='main' style={{ paddingTop: '20px' }}>
        <div style={{ flex: 1 }}>预约提前结算</div>
        <div style={{ flex: 1 }}>当达到你的设定结算本金和可盈额时，系统自动结算</div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className='money'><span>结算本金</span><span className='right'>自动结算的可赢额：{
                setAutoClearBalance()
            }</span></div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <>￥</>
                <Input
                    ref={eaCheckoutRef}
                    min={setMin(seriesType, args.smis, args.pmis)}
                    type='number'
                    defaultValue={`${eaCheckout}`}
                    value={eaCheckout}
                    onChange={handleEaCheckoutChange}
                    style={{ border: '1px solid blue', height: '40px', width: '100%' }}
                />
            </div>

        </div>
        <div style={{ flex: 1 }}>
            <div className='money'><span>结算返还额</span><span className='right'>限额：{calculate(handleBetAmount(betAmount, args.cashOutAmount), amt)}~{calculateAdd(handleBetAmount(betAmount, args.cashOutAmount), WinnableAmount(handleBetAmount(betAmount, args.cashOutAmount), calculate(handleBetAmount(betAmount, args.cashOutAmount), oddsValue)))}</span></div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <>￥</>
                <Input
                    ref={settlementRef}
                    defaultValue={`${settlementReturn}`}
                    value={settlementReturn}
                    type='number'
                    onChange={handleSettlementReturnChange}
                    style={{ border: '1px solid blue', height: '40px', width: '100%' }}
                    min={calculate(betAmount, amt)}
                    max={calculateAdd(betAmount, calculate(betAmount, oddsValue))}
                />
            </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: '20px' }}>
            {
                isShowButton ? <Button color='primary' fill='outline' onClick={() => { appointCancellation(args); cancel() }}>取消预约</Button> : <Button color='primary' fill='outline' onClick={cancel}>取消</Button>
            }
            <Button color='primary' style={{ background: 'blue', marginLeft: '12px' }} onClick={preSettlement}>预约结算</Button>
        </div>
    </div>
}


export default Reserve