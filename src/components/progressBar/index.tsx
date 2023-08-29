import React from 'react';
import './progressBar.scss'
interface IProp {
    percent: number | string,
    innerBackground: string,
    ourBackground: string
}
const ProgressBar: React.FC<IProp> = ({ percent, innerBackground, ourBackground }: IProp) => {
    return <div className='progress' style={{ background: ourBackground }}>
        <div
            className='line'
            style={{ height: '100%', width: `${percent}%`, background: innerBackground }}
        ></div>
    </div>
}
export default ProgressBar