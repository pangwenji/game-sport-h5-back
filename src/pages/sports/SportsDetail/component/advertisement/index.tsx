import React, { useState, PropsWithChildren, useEffect } from 'react';
import './advertisement.scss';
import elastic from '@/assets/images/sports/svg/elastic.svg';
import tips from '@/assets/images/sports/svg/tips.svg';
import video from '@/assets/images/sports/svg/video.svg';
import animations from '@/assets/images/sports/svg/animation.svg'
import { Tag } from 'antd-mobile';
import { Popover } from 'antd-mobile'
import HT from '@/assets/images/sports/svg/HT.svg'
import jiao from '@/assets/images/sports/svg/jiao.svg'
import Barrage from '@/components/barrage';
import { useHistoryStore, useMatchDetailStore } from '@/stores/sports-detail';
import { checkTheMarchIsProgress, checkoutSessionStatus, handleScore, processTimeShip, showMarchTime } from '@/hooks/useBettings';
import Header from '../header';
import hemis from '@/assets/images/sports/svg/hemisphere.svg';
import plate from '@/assets/images/sports/svg/plate.svg';
import bureau from '@/assets/images/sports/svg/bureau.svg';
import defaultImage from '@/assets/images/sports/img/default-image.png'

interface IProp {
    changePanel: (args: string) => void
}

const Advertisement: React.FC<PropsWithChildren<IProp>> = ({ changePanel }: IProp) => {

    let timer
    const [point, setScorePoint] = useState([]);
    const [yellowCard, setYellowCard] = useState([])
    const [redCard, setRedCard] = useState([]);
    const [cornerKick, setCornerKic] = useState([]);
    const [hemisphere, setHemisphere] = useState([])
    const [halfScore, setHalfScoreHome] = useState([]);
    const [pan, setPan] = useState([]);
    const [bureaus, setBureau] = useState([])
    const [time, setTime] = useState(0)
    const [neValue, setNetValue] = useState(0);//设置中立场
    let { ts, nsg, mc, mg, ne, bt, fmt, haveVs, haveAs, sportId } = useMatchDetailStore.getState();

    const setTitle = () => {
        //足球
        if (nsg && nsg.length > 0) {
            setScorePoint(handleScore(nsg, 1000, 5))//设置比分;
            setCornerKic(handleScore(nsg, 1000, 6))//设置角球
            setHalfScoreHome(handleScore(nsg, 1002, 5));
            setYellowCard(handleScore(nsg, 1000, 7));//设置黄牌
            setRedCard(handleScore(nsg, 1000, 8))//设置红牌
        }

        setNetValue(ne);
        //篮球
        if (nsg && nsg.length > 0) {
            if (sportId === 3) {
                setScorePoint(handleScore(nsg, 3001, 5))
                setHemisphere(handleScore(nsg, 3003, 5))
            }
        }

        //网球
        if (nsg && nsg.length > 0) {
            if (sportId === 5) {
                setScorePoint(handleScore(nsg, 5000, 5))
                setPan(handleScore(nsg, 5001, 5));
                setBureau(handleScore(nsg, 5003, 5556))
            }
        }
        //排球
        if (nsg && nsg.length > 0) {
            if (sportId === 13) {
                setScorePoint(handleScore(nsg, 15004, 5559))
                setBureau(handleScore(nsg, 15001, 5))
            }
        }
    }
    useEffect(() => {
        timer = setInterval(() => setTime((prevTime: number) => prevTime + 1), 1000);
        return () => clearInterval(timer);
    }, []);
    const renderTip = () => {
        return (<div className='statement'>
            <div>免责声明:</div>
            <p>BB将为会员提供赛事数据、直播作为参考。所有投注将以投注时在投注单中显示的正确比分为准。</p>
            <p>BB将尽最大努力确保所显示内容的及时性、正确性，如有偏差，BB将拥有最终解释权。</p>
        </div>)
    }
    useEffect(() => {
        setTitle();
    }, [mg.length])
    return (
        <div className='context'>

            {/* <div style={{ height: '50px' }}><Header /></div> */}
            <div style={{ height: '50px' }}></div>

            <div className='team-row'>
                {/* 主队 */}
                <div className='team-left'>
                    <div className='team-name'>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {
                                ts.length > 0 ? <span className='team-name-left' style={{ textAlign: 'end' }}>{ts[0].na}</span> : null
                            }
                        </div>
                        <div className='card-panel'>
                            {redCard.length > 0 && redCard[0] !== 0 ? <div className='red-card'>{redCard[0]}</div> : null}
                            {yellowCard.length > 0 && yellowCard[0] !== 0 ? <div className='yellow-card'>{
                                yellowCard[0]
                            }</div> : null}
                        </div>
                    </div>
                    {
                        ts.length > 0 ? <img src={ts[0].lurl ? ts[0].lurl : defaultImage} width={35} height={35} /> : null
                    }
                </div>
                <div className='team-middle' style={{ width: '9%', textAlign: 'center' }}><span className='vs-text'>VS</span></div>
                {/* 客队 */}
                <div className='team-right'>
                    {
                        ts.length > 0 ? <img src={ts[1].lurl ? ts[1].lurl : defaultImage} width={35} height={35} /> : null
                    }
                    <div className='team-name' >
                        {
                            ts.length > 0 ? <span className='team-name-left' style={{ justifyContent: 'flex-start' }}>{ts[1].na}</span> : null
                        }
                        <div className='card-panel' style={{ justifyContent: 'flex-start' }}>
                            {yellowCard[1] ? <div className='yellow-card'>{yellowCard[1]}</div> : null}
                            {redCard[1] ? <div className='red-card'>{redCard[1]}</div> : null}
                        </div>
                    </div>
                </div>
            </div>
            <div className='race-score'>
                <span style={{ color: point[0] > point[1] ? '#ffd7a2' : '' }}>{
                    point[0] !== undefined ? point[0] : '--'
                }</span>
                <div className='square'>
                    <div className='square-box' >
                        {/* 赛事场次 */}
                        <div className='mark-red'>

                            {
                                showMarchTime(mc, bt, fmt, time)
                            }
                        </div>
                    </div>
                    {
                        halfScore.length > 0 ? (
                            <div className='square-box'>
                                <span className='competition'>{halfScore[0]}<img src={HT} width={13} height={8} style={{ marginLeft: '5px', marginRight: '5px' }} />{halfScore[1]}</span>
                            </div>
                        ) : null
                    }
                    {
                        cornerKick.length > 0 ? (
                            <div className='square-box'>
                                <span className='competition'>{cornerKick[0]}<img src={jiao} width={13} height={13} style={{ marginLeft: '5px', marginRight: '5px' }} />{cornerKick[1]}</span>
                            </div>
                        ) : null
                    }
                    {
                        hemisphere.length > 0 ? (
                            <div className='square-box'>
                                <span className='competition'>{hemisphere[0]}<img src={hemis} width={13} height={13} style={{ marginLeft: '5px', marginRight: '5px' }} />{hemisphere[1]}</span>
                            </div>
                        ) : null
                    }
                    {
                        pan.length > 0 ? (
                            <div className='square-box'>
                                <span className='competition'>{pan[0]}<img src={plate} width={13} height={13} style={{ marginLeft: '5px', marginRight: '5px' }} />{pan[1]}</span>
                            </div>
                        ) : null
                    }
                    {
                        bureaus.length > 0 ? (
                            <div className='square-box'>
                                <span className='competition'>{bureaus[0]}<img src={bureau} width={13} height={13} style={{ marginLeft: '5px', marginRight: '5px' }} />{bureaus[1]}</span>
                            </div>
                        ) : null
                    }
                    {
                        neValue ? <div className='neValue'>
                            <div className='N'>N</div>
                            <span style={{ fontSize: '12px' }}>中立场</span>
                        </div> : null
                    }
                    {/* 未开始 */}
                    {
                        !mc ? (
                            <div className='square-box'>
                                <span className='competition'>{checkTheMarchIsProgress(mc)}</span>
                            </div>
                        ) : null
                    }
                </div>
                <span style={{ justifyContent: 'flex-start', color: point[1] > point[0] ? '#ffd7a2' : '' }}>{
                    point[1] !== undefined ? point[1] : '--'
                }
                </span>
            </div>
            <div className='team-bottom'>
                <div className='box' style={{ width: '140px' }}>
                    <div className='box-content' style={{ width: '120px' }}>
                        {
                            haveVs.have && haveVs.have ? (
                                <div className='media' onClick={() => changePanel('video')}>
                                    <img src={video} width={22} height={22} />
                                    <span>视频</span>
                                </div>
                            ) : null
                        }
                        {
                            haveAs && haveAs.length > 0 ? (
                                <div className='media' onClick={() => changePanel('animation')}>
                                    <img src={animations} width={22} height={22} />
                                    <span >动画</span>
                                </div>
                            ) : null
                        }
                    </div>
                </div>
                <div className='box'>
                    <div className='box-content-left'>
                        <Barrage titleBottom="是公司非递归算法的反对广泛的" titleTop="符合法规符合法规" />
                        <Popover content={renderTip()} trigger='click' placement='left' >
                            <img src={tips} width={25} height={25} style={{ paddingTop: '5px' }} />
                        </Popover>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Advertisement;