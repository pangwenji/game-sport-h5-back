import React, { useEffect } from "react";
import '../cuttingEdgeNews.scss';
import { renderDimensionLeftCircle, renderDimensionRightCircle } from "@/hooks/useCuttingEdgeNews";

const Dimension: React.FC = () => {
    useEffect(() => {
        renderDimensionLeftCircle()
        renderDimensionRightCircle()
    }, [])
    return <div className="amount">
        {
            [
                { eChart: 'left-circle' },
                { eChart: 'right-circle' },

            ].map((res, index) => {
                return (

                    <div className="box" key={index}>
                        <div className="chart-name">两球半</div>
                        <div className="chart-num">
                            <div className="slot" />
                            <div className="chart-ps-top">当大球赔率<span>0.85</span>时</div>
                            <div className="chart-ps-bottom"><span className="rate">48%</span><span>胜率</span></div>
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

export default Dimension