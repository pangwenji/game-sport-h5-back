import React, { useEffect, useState } from "react";
import './cuttingEdgeNews.scss';
import *  as eschars from 'echarts';
import Dimension from "./dimension";
import Handicap from "./Handicap";
import WinAlone from "./winAlone";
enum EnumStatus {
    DIMENSION = 'dimension',//大小
    HANDICAP = 'handicap',//让球
    WIN_ALONE = 'winAlone'//独赢
}

const CuttingEdgeNews: React.FC = () => {

    const showStatus = (type: string) => {
        switch (type) {
            case EnumStatus.DIMENSION:
                return <Dimension />
            case EnumStatus.HANDICAP:
                return <Handicap />
            case EnumStatus.WIN_ALONE:
                return <WinAlone />
            default:
                return <div></div>
        }
    }

    const [status, setStatus] = useState(EnumStatus.DIMENSION)

    useEffect(() => {
        // renderLeftCircle()
        // renderRightCircle()
    }, [])
    return (
        <div>
            <div className="cuttingEdgeNews">
                <span>
                    历史同赔
                </span>
                <div className="left">
                    <span className={status === EnumStatus.DIMENSION ? 'active' : ''} onClick={() => setStatus(EnumStatus.DIMENSION)}>大小</span>
                    <span className={status === EnumStatus.HANDICAP ? 'active' : ''} onClick={() => setStatus(EnumStatus.HANDICAP)}>让球</span>
                    <span className={status === EnumStatus.WIN_ALONE ? 'active' : ''} onClick={() => setStatus(EnumStatus.WIN_ALONE)}>独赢</span>
                </div>
            </div>
            <div className="title-ps">过去3年相似走势共出现355050次，数据仅供参考</div>
            <div className="chart-area">
                <div className="chart-area-box">
                    {showStatus(status)}
                </div>
            </div>
        </div>
    )
}

export default CuttingEdgeNews;