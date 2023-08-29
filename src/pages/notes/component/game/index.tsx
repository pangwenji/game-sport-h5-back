import React, { useEffect, useState } from "react";
import './games.scss'
import Marquee from "react-fast-marquee";
import { marqueedata } from "@/hooks/notes/sports/useSports";
import { Checkbox, Dropdown, Empty, Popup } from "antd-mobile";
import horn from '@/assets/images/sports/svg/horn.svg';
import left from '@/assets/images/sports/img/left-0.png'
import { CloseOutline, LeftOutline } from "antd-mobile-icons";
import listen from '@/assets/images/sports/svg/listenMusic.svg'
import circle_inActive from '@/assets/images/sports/svg/circle-inActive.svg'
import circle_active from '@/assets/images/sports/svg/circle-active.svg'
import Customer from "@/components/customer";
const Game: React.FC = () => {

    let data = Array.from({ length: 12 }).fill({})
    let tem = ['1'];
    let [visible, setVisible] = useState(false);
    const [allVisible, setAllVisible] = useState(false);
    const [activeKey] = useState('')
    const [status, setStatus] = useState('all');

    useEffect(() => {
        // fetchGameBetByChannel({ userName: '', startTime: '', endTime: '' })
    }, [])
    return <div>
        <div className="money-level">
            <span>
                总计 <span>0</span> 单，投注额  <span>0</span> 元，输赢 <span>0</span>元
            </span>
        </div>
        {
            data.length > 0 ? <div className="game-content">
                {
                    data.map((res, index) => {
                        return (
                            <div className="item" onClick={() => setVisible(true)}>
                                <div className="item-image">
                                    <img src={left} width={40} height={40} />
                                </div>
                                <div className="item-title">
                                    <span className="item-title-top">FB体育</span>
                                    <span className="item-title-bottom">投注额: ¥0</span>
                                </div>
                                <div className="quantity">
                                    {index}单
                                </div>
                                <div className="total">
                                    0
                                </div>
                            </div>
                        )
                    })
                }
            </div> : <div className="data-empty">
                <div className="notice">
                    <div className="img">
                        <img src={horn} height={17} width={17} />
                    </div>
                    <span className="tip">
                        赛事公告：</span>
                    <div className="tip-content">
                        <Marquee pauseOnHover={true} speed={60} loop={0}>
                            {
                                marqueedata.map((text, idx) => {
                                    return (
                                        <span key={idx} className="marquee-text">{text}</span>
                                    )
                                })
                            }
                        </Marquee>
                    </div>
                </div>
                <div>
                    <Empty description='暂无数据' />
                </div>
            </div>
        }
        <Popup
            visible={visible}
            position='right'
            bodyStyle={{ width: '100vw' }}
        >
            <div className="popup-content">
                <div className="popup-header">
                    <div className="popup-header-top">

                        <div className="left-arrow" onClick={() => setVisible(false)}>
                            <LeftOutline width={23} height={28} color="#ffffff" />
                        </div>
                        <div className="pop-title">
                            BB棋牌
                        </div>
                        <div className="listen">
                            <Customer />
                        </div>
                    </div>
                    <div className="popup-header-bottom">

                    </div>
                </div>
                <div className="popup-content-bottom">
                    <div className="top-panel">
                        <div className="top-panel-left">
                            <Dropdown onChange={() => setAllVisible(!allVisible)} activeKey={activeKey}>
                                <Dropdown.Item key='sorter' title='全部'>

                                </Dropdown.Item>
                            </Dropdown>
                        </div>
                        <div className="top-panel-right">
                            <span>总共:<span>0</span>单</span>，
                            <span>输赢:<span>0</span>元</span>，
                            <span>投注额:<span>0</span>元</span>
                        </div>
                    </div>
                </div>
            </div>
        </Popup>
        <Popup
            visible={allVisible}
            position='bottom'
            bodyStyle={{
                width: '100vw',
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px',
            }}
            onMaskClick={() => setAllVisible(false)}
        >
            <div className="pop-bottom">
                <div className="pop-bottom-header">
                    <span onClick={() => setAllVisible(false
                    )}>
                        <CloseOutline width={20} height={20} />
                    </span>
                    <div>筛选</div>
                    <div className="confirm">确定</div>
                </div>
                <div className="pop-bottom-content" onClick={() => setStatus('all')}>
                    <span>全部</span>
                    <div className="circle">
                        {status === 'all' ? <img src={circle_active} width={20} height={20} /> : <img src={circle_inActive} width={20} height={20} />}
                    </div>
                </div>
                <div className="pop-bottom-content" onClick={() => setStatus('settled')}>
                    <span>已结算</span>
                    <div className="circle">
                        {status === 'settled' ? <img src={circle_active} width={20} height={20} /> : <img src={circle_inActive} width={20} height={20} />}
                    </div>
                </div>

                <div className="pop-bottom-content" onClick={() => setStatus('unsettled')}>
                    <span>未结算</span>
                    <div className="circle">
                        {status === 'unsettled' ? <img src={circle_active} width={20} height={20} /> : <img src={circle_inActive} width={20} height={20} />}

                    </div>
                </div>
            </div>
        </Popup>
    </div>
}

export default Game;