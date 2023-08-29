import React, { useEffect } from "react";
import './real-time.scss'
import { Empty, List } from "antd-mobile";
import OrangeTip from '@/assets/images/sports/svg/orange-tips.svg';
import triangle from '@/assets/images/sports/svg/triangle.svg';
import *  as eschars from 'echarts';
import { data, echarScoreProgressOption, echarScoreRightProgressOption, echarTabOption } from "@/hooks/useRealTime";
import ProgressBar from "@/components/progressBar";
import Basketball from "./basketball";
import Tennis from "./tennis";
import FootBall from "./football";
import WeatherPanel from "../Panel";
import { useHistoryStore } from "@/stores/sports-detail";
const RealTime: React.FC = () => {
    let { textLiveList } = useHistoryStore.getState();
    let data = []
    return (
        <div className="real-time">

            <Basketball />
            {
                textLiveList.length !== 0 ?
                    <div>
                        <div className="border-line-bottom">
                            <span>文字直播</span>
                            <img src={OrangeTip} width={20} height={20} />
                        </div>
                        <List >
                            {
                                textLiveList.map((res, idx) => {
                                    return <List.Item key={idx}>
                                        <div className="box">
                                            <div className="box-left">
                                                <img src={triangle} width={20} height={20} />
                                            </div>
                                            <div className="box-right">
                                                <div className="top">   <img src={triangle} width={20} height={20} /><span>{res.eventTime}</span></div>
                                                <div className="bottom">{res.data}</div>
                                            </div>
                                        </div>
                                    </List.Item>
                                })
                            }
                        </List>
                    </div> : null
            }
        </div>
    )
}

export default RealTime;