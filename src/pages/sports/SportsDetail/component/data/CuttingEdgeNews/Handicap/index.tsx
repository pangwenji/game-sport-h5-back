import React, { useEffect } from "react"
import '../cuttingEdgeNews.scss';
import { renderHandicapLeftCircle, renderHandicapMiddleCircle, renderHandicapRightCircle } from "@/hooks/useCuttingEdgeNews";
const Handicap: React.FC = () => {
    useEffect(() => {
        renderHandicapLeftCircle();
        renderHandicapMiddleCircle();
        renderHandicapRightCircle()
    }, [])
    return <div className="amount">
        {
            [
                { eChart: 'left-circle' },
                { eChart: 'middle-circle' },
                { eChart: 'right-circle' },

            ].map((res, index) => {
                return (
                    <div className="box" key={index}>
                        <div className="chart-name">半球</div>
                        <div className="chart-num">
                            <div className="slot" />
                            <div className="chart-ps-top">当大球赔率<span>1.01</span>时</div>
                            <div className="chart-ps-bottom"><span className="rate">56%</span><span>胜率</span></div>
                        </div>
                        <div className="chart-char">
                            <div className="circle" id={res.eChart}></div>
                        </div>
                    </div>
                )
            })
        }
    </div>
}

export default Handicap