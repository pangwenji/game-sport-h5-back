import React, { useState, useCallback, useEffect, useRef, PropsWithChildren, useMemo } from "react";
import Header from './component/header';
import { CapsuleTabs, Mask, SpinLoading } from 'antd-mobile'
import Advertisement from "./component/advertisement";
import Betting from "./component/betting";
import CharRoom from "./component/chatRoom";
// import ResizeObserver from 'resize-observer-polyfill';
// import Data from "./component/data";
import Data from "./component/data";
import './index.scss'
import { CloseOutline } from "antd-mobile-icons";
import Barrage from "@/components/barrage";
import { useMatchDetailStore } from "@/stores/sports-detail";
import { getListData, getSportUnionData, handleScore, showMarchTime } from "@/hooks/useBettings";
type advProp = {
    bottom: number,
    height: number,
    left: number,
    right: number,
    top: number,
    width: number,
    x: number,
    y: number,
}



export type listProp = {
    smin?: string
    bms?: Array<object>
    [x: string]: any;

    current?: number
    pageTotal?: number
    records?: Array<any>
    size?: number
    total?: number
}

export type resultProp = {
    code: number,
    data: listProp,
    success?: boolean
}
const playUrl = '&amp;isMobile=true&amp;fullscreen=1&amp;refresh-icon=1&amp;pip-icon=1&amp;dplayer-volume=1&amp;dplayer-volume=1'
const GameDetail: React.FC = () => {

    let [point, setScorePoint] = useState([]);
    let [play, setPlay] = useState('')
    let [isShow, setIsShow] = useState(false);
    let [exhibition, setExhibition] = useState(false);
    let [headerTitle, setHeaderTitle] = useState('')
    let [showType, setShowType] = useState('');
    let [loading, setLoading] = useState(true);
    let [isHide, setIsHide] = useState(false);
    let [time, setTime] = useState(0)
    let { mc, ts, nsg, mg, bt, fmt, } = useMatchDetailStore.getState();
    let {
        Marchid,
        haveVs,
        haveAs,//是否有动画
        type,//类型
        sportId
    } = useMatchDetailStore.getState()
    //监听页面滚动
    const handleScroll = () => {
        let headerDom: HTMLElement | Element | any = document.getElementById('advertisement');
        if (headerDom) {
            let { top }: advProp = headerDom.getBoundingClientRect();
            let topValue = Number(parseInt(`${top}`).toFixed(2));
            if (topValue <= -250) {
                setIsShow(true);
            } else {
                setIsShow(false);
            }
        }
    }
    const IframeBottom = () => {
        return (
            <div className="iframe-bottom">
                <div className="iframe-bottom-line"></div>
                <div className="iframe-bottom-time">
                    <span>
                        {showMarchTime(mc, bt, fmt, time)}
                    </span>
                </div>
            </div>
        )
    }

    let live = useMemo(() => {
        return encodeURIComponent(`${haveVs.flvSD}&isMobile=false&mute=静音&cancel_mute=取消静音&open_pip=开启画中画&fullscreen=0&hotkey=true`)
    }, [haveVs.have]);
    const changePanel = (value: string) => {
        let videoUrl = `https://video.fb9pro.com/live/index.html?liveUrl=${live}`
        setExhibition(true);
        if (value === 'animation') {
            setPlay(haveAs[0]);
        } else {
            setPlay(videoUrl);
        }
        setIsHide(false);
    }

    const close = () => {
        setExhibition(false);
        setLoading(true);
    }



    getSportUnionData({ ts: new Date().getTime(), language: 'zh_CN' })
    useEffect(() => {
        const timer = setInterval(() => setTime((prevTime: number) => prevTime + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        setScorePoint(handleScore(nsg, 1000, 5))//设置比分;
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        let param = {
            matchId: Marchid,
            type: type,
            sid: sportId,
            userName: localStorage.getItem('userName')
        }
        getListData(param);
        let timer = setInterval(() => {
            getListData(param)
        }, 10000)

        return () => clearInterval(timer);
    }, [])


    return (
        <div className="content" >
            {
                exhibition ?
                    <div className="media-content">

                        <div className="iframe">
                            <div className="iframe-top" onClick={() => setIsHide(!isHide)}>
                                {
                                    isHide ? <div className="close" onClick={() => close()} ><CloseOutline color="#ffffff" /></div> : null
                                }
                                {
                                    loading ? <div className="spin" >
                                        <SpinLoading color="green" />
                                    </div> : null
                                }

                                <div className="iframe-box">
                                    {/* 动画 */}
                                    <div className="iframe-box-mark"></div>
                                    <iframe id="show-iframe" className="iframe-style" src={play} scrolling={'no'} width={"100%"} height={'100%'} allowFullScreen onLoad={() => setLoading(false)}></iframe>
                                </div>

                                {
                                    isHide ? (
                                        <div>
                                            <div className="score">
                                                <div className="score-left">
                                                    {
                                                        ts.length > 0 ? ts[0].na : null
                                                    }
                                                    <img src={ts[0].lurl} width={24} height={24} />
                                                </div>
                                                <div className="score-context" >

                                                    {
                                                        point && point.length > 0 ? <>{`${point[0]} - ${point[1]}`}</> : null
                                                    }
                                                </div>
                                                <div className="score-right">
                                                    <img src={ts[1].lurl} width={24} height={24} />
                                                    {
                                                        ts.length > 0 ? ts[1].na : null
                                                    }
                                                </div>
                                            </div>
                                            <div className="bounce">
                                                <Barrage titleBottom="是公司非递归算法的反对广泛的" titleTop="符合法规符合法规" />
                                            </div>
                                            <div className="file">
                                                {/* <FileOutLine /> */}
                                            </div>
                                        </div>

                                    ) : null
                                }
                            </div>
                            {IframeBottom()}
                        </div>
                    </div>

                    : (
                        <div id="advertisement">
                            <Header title={'hell0'} isShowMatch={isShow} />
                            <Advertisement changePanel={changePanel} />
                        </div>
                    )
            }
            <CapsuleTabs  >
                <CapsuleTabs.Tab title='投注' key='betting' className="active-tabs">
                    <Betting />
                </CapsuleTabs.Tab>
                <CapsuleTabs.Tab title='聊天室' key='chatRoom' className="active-tabs" >

                    <CharRoom />
                </CapsuleTabs.Tab>

                <CapsuleTabs.Tab title='数据' key='data' className="active-tabs">
                    <Data />
                </CapsuleTabs.Tab>
                {/* <CapsuleTabs.Tab title='主播' key='anchor' >
                    <Anchor />
                </CapsuleTabs.Tab> */}
            </CapsuleTabs>


        </div>
    )
}

export default GameDetail;

