import { checkoutOdds } from '@/hooks/useBettings';
import { resultMgMksType } from '@/interface';
import { useHistoryStore } from '@/stores/sports-detail';
import React, { useEffect, useState } from 'react';
import { PreviousValueArray } from '@/hooks/useRecordValue'
interface IProp {
    value: number
    ss?: number
}
let record = new PreviousValueArray<number>(0);
const SpanRight: React.FC<IProp> = ({ value, ss }: IProp) => {
    let { disable } = useHistoryStore.getState();
    const [isLock, setIsLock] = useState(false);
    const [redUp, setRedUp] = useState(false);
    const [green, setGreen] = useState(false)
    record.update(value)
    let twoData = record.getValues();

    const detection = (value) => {
        if (isLock) {
            return <img src="https://s3.ap-southeast-1.amazonaws.com/superspace.click/lock.svg" width={15} height={15} />
        }

        return value;
    }
    useEffect(() => {
        if (value === -999 || ss === 0) {
            setIsLock(true)
        } else {
            setIsLock(false)
        }
    }, [value, disable, isLock])

    const checkoutStatus = (value) => {
        if (redUp) {
            return <img src="https://s3.ap-southeast-1.amazonaws.com/superspace.click/up-arrow.png" width={15} height={15} />
        }
        if (green) {
            return <img src="https://s3.ap-southeast-1.amazonaws.com/superspace.click/down-arrow.png" width={15} height={15} />
        }
        return ''
    }
    useEffect(() => {
        if (!isLock) {

            if (twoData[0] < twoData[1]) {
                setRedUp(true);
                setTimeout(() => {
                    setRedUp(false)
                }, 500)
            }
            if (twoData[0] > twoData[1]) {
                setGreen(true);
                setTimeout(() => {
                    setGreen(false)
                }, 500)
            }
        }
    }, [value])

    return (
        <span className="span_right">
            {detection(value)}
            {checkoutStatus(value)}
        </span>
    )
}

export default SpanRight;