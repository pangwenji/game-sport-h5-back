import React, { useEffect, useState } from "react";
import '../header.scss';
import templateImage from '@/assets/images/sports/img/kk.png';
import triangle from '@/assets/images/sports/svg/triangle.svg';
import { getList } from "@/api/event_details";
import tips from '@/assets/images/sports/svg/tips.svg';
import { useNavigate } from 'react-router-dom';
import './march-panel.scss'
import { handleTimeShip, processTimeShip, refreshMg, saveEveryDetailData, setCircle, setScore, setTriangle, showMarchTime } from "@/hooks/useBettings";
import { useHistoryStore } from "@/stores/sports-detail";
import eventBus from "@/utils/events";
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
interface IProp {
    close: () => void
}

const MarchPanel: React.FC<IProp> = ({ close }: IProp) => {
    const [time, setTime] = useState(0)
    let { list } = useHistoryStore.getState()
    const navigate = useNavigate()
    const goToDetailPage = (item) => {
        //到详情主页
        refreshMg(item)
        navigate('/sports-detail');
        eventBus.emit('close-drown', '1')
        close();//关闭
    }
    useEffect(() => {
        const timer = setInterval(() => setTime((prevTime: number) => prevTime + 1), 1000);
        return () => clearInterval(timer);
    }, []);
    return <div>
        {
            list.length > 0 ?
                <div className="march-list-content">{
                    list.map((element, index) => {
                        return (
                            <div className="league-content" key={index} onClick={() => goToDetailPage(element)}>
                                <div className="league-top" >
                                    <img src={element.lg.lurl} style={{ width: '15px', height: '15px' }} />
                                    <span>{element.lg.na}</span>
                                </div>
                                <div className="league-score-part">
                                    <div className="time-more">
                                        <span>{handleTimeShip(element.mc.pe)}</span>
                                        <span>{showMarchTime(element.mc, element.bt, element.fmt, time)}</span>
                                    </div>
                                    <div className="away-team-context">
                                        <div className="return-arrow">
                                            <span style={{ color: '#8A8A8D' }}>{element.tms}&gt;</span>
                                        </div>
                                        {/* <p >{element.ts[1].na}</p> */}
                                    </div>
                                </div>
                                <div className="middle-content">

                                    <div className="away-team">
                                        <p>{element.ts[0].na}</p>
                                        <img src={element.ts[0].lurl} width={35} height={35} />
                                    </div>

                                    <div className="score">
                                        {setScore(element)}
                                    </div>
                                    <div className="away-team">
                                        <img src={element.ts[1].lurl} width={35} height={35} />
                                        <p>{element.ts[1].na}</p>
                                    </div>
                                </div>
                                <div className="bottom-score">
                                    <div className="bottom-score-item">
                                        {setTriangle(element) ? <img src={triangle} /> : null}
                                        <span>{setTriangle(element)}</span>
                                    </div>
                                    <div className="bottom-score-item">
                                        {setCircle(element) ? <img src={tips} width={10} height={10} /> : null}
                                        <span>{setCircle(element)}</span>
                                    </div>
                                </div>
                                {/* <div className="league-bottom">
                                    <div className="away-team">
                                        <p>{element.ts[0].na}</p>
                                        <img src={element.ts[0].lurl} width={35} height={35} />
                                    </div>
                                    <div className="away-team-middle">
                                        <div className="time-more">
                                            <span>{handleTimeShip(element.mc.pe)}</span>
                                            <span>{showMarchTime(element.mc, element.bt, element.fmt, time)}</span>
                                        </div>
                                        <div className="score">
                                            {setScore(element)}
                                        </div>
                                        <div className="teams">
                                            <div>
                                                {setTriangle(element) ? <img src={triangle} /> : null}
                                                <span>{setTriangle(element)}</span>
                                            </div>
                                            <div>
                                                {setCircle(element) ? <img src={tips} width={10} height={10} /> : null}
                                                <span>{setCircle(element)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="away-team" >
                                        <div className="away-team-img">
                                            <img src={element.ts[1].lurl} width={35} height={35} />
                                        </div>
                                        <div className="away-team-context">
                                            <div className="return-arrow">
                                                <span >{element.tms}&gt;</span>
                                            </div>
                                            <p >{element.ts[1].na}</p>
                                        </div>
                                    </div>

                                </div> */}
                            </div>
                        )
                    })

                }</div>
                : <div className="noData">没数据</div>
        }
    </div>
}

export default MarchPanel;

