import { Mask, Tag } from "antd-mobile"
import React, { useState, PropsWithChildren } from "react"
import elastic from '@/assets/images/sports/svg/elastic.svg';
import './barrage.scss'
interface IProp {
    titleTop?: string,
    titleBottom?: string,
}
const Barrage: React.FC<PropsWithChildren<IProp>> = ({ titleTop, titleBottom, }: IProp) => {
    const [showBarrage, setShowBarrage] = useState(false);
    return <div style={{ paddingTop: '4.5px', marginRight: '10px' }}>
        <img src={elastic} width={25} height={25} onClick={() => setShowBarrage(!showBarrage)} />
        <Mask visible={showBarrage} style={{ height: '120px' }} opacity={0} >
            <div className='image-header-text' >
                <Tag round color='#000000B3' className='tag'>
                    {titleTop}
                </Tag>
                <Tag round color='#000000B3' >
                    {titleBottom}
                </Tag>
            </div>
        </Mask>
    </div>
}

export default Barrage